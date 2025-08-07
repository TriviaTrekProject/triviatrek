import React, { Suspense, ElementType } from "react";
import { motion, Transition, MotionProps } from "motion/react";
import { usePreloadBackground } from "../hook/usePreloadBackground";

// Composants essentiels (chargés immédiatement)
import SkyBg from "../components/common/background/SkyBg";
import ShoreBg from "../components/common/background/ShoreBg";

// Composants secondaires (lazy loaded)
const SeaBg = React.lazy(() => import("../components/common/background/SeaBg"));
const RockBg = React.lazy(() => import("../components/common/background/RockBg"));
const ShipBg = React.lazy(() => import("../components/common/background/ShipBg"));
const Bird1Bg = React.lazy(() => import("../components/common/background/Bird1Bg"));
const Bird2Bg = React.lazy(() => import("../components/common/background/Bird2Bg"));

const MotionSkyBg = motion.create(SkyBg);
const MotionShoreBg = motion.create(ShoreBg);

interface OptimizedParallaxBackgroundProps {
    disableAnimation?: boolean;
    quality?: 'low' | 'medium' | 'high';
}

const OptimizedParallaxBackground: React.FC<OptimizedParallaxBackgroundProps> = ({
    disableAnimation = false,
    quality = 'high'
}) => {
    const { isPreloaded, progress } = usePreloadBackground();

    const shouldAnimate = !disableAnimation && quality !== 'low';
    
    const commonTransition: Transition = {
        duration: quality === 'low' ? 10 : 7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: quality === 'low' ? 3 : 1.5,
    };

    return (
        <div className="fixed w-full h-dvh overflow-hidden -z-1 justify-center items-center flex top-0">
            {/* Arrière-plan essentiel (rendu immédiat) */}
            <MotionSkyBg className="absolute h-dvh w-auto" />
            
            <Suspense fallback={null}>
                {/* Niveau 1: Éléments principaux */}
                <LazyMotionComponent
                    component={RockBg}
                    shouldAnimate={shouldAnimate}
                    transition={commonTransition}
                    animationProps={{
                        initial: { x: 0 },
                        animate: { x: 75 },
                    }}
                    className="absolute h-dvh w-auto transform-gpu [transform-box:fill-box]"
                />
                <LazyMotionComponent
                    component={SeaBg}
                    shouldAnimate={shouldAnimate}
                    transition={commonTransition}
                    animationProps={{
                        initial: { x: 0 },
                        animate: { x: 75 },
                    }}
                    className="absolute h-dvh w-auto transform-gpu [transform-box:fill-box]"
                />

                {/* Niveau 2: Éléments moyens (chargés après le niveau 1) */}
                {quality !== 'low' && (
                    <Suspense fallback={null}>
                        <LazyMotionComponent
                            component={ShipBg}
                            shouldAnimate={shouldAnimate}
                            transition={commonTransition}
                            animationProps={{
                                initial: { x: -100 },
                                animate: { x: -275 },
                            }}
                            className="absolute h-dvh w-auto transform-gpu [transform-box:fill-box] origin-[50%_50%]"
                        />

                        {/* Niveau 3: Détails (oiseaux, chargés après le niveau 2) */}
                        {quality === 'high' && (
                            <Suspense fallback={null}>
                                <LazyMotionComponent
                                    component={Bird1Bg}
                                    shouldAnimate={shouldAnimate}
                                    transition={{ ...commonTransition, delay: 0.5 }}
                                    animationProps={{
                                        initial: { x: 50 },
                                        animate: { x: -150 },
                                    }}
                                    className="absolute h-dvh w-auto [transform-box:fill-box] origin-[500px_280px] transform scale-x-[-1] transform-gpu"
                                />
                                
                                <LazyMotionComponent
                                    component={Bird2Bg}
                                    shouldAnimate={shouldAnimate}
                                    transition={{ ...commonTransition, delay: 0.5 }}
                                    animationProps={{
                                        initial: { x: -100 },
                                        animate: { x: -150 },
                                    }}
                                    className="absolute h-dvh w-auto transform-gpu [transform-box:fill-box]"
                                />
                            </Suspense>
                        )}
                    </Suspense>
                )}
            </Suspense>

            <MotionShoreBg className="absolute h-full w-auto" />

            {/* Indicateur de chargement */}
            {!isPreloaded && progress > 0 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                            <div className="w-3 h-3 border border-white/40 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-white/60 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            Chargement {Math.round(progress)}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Composant helper pour Motion + Lazy avec des types améliorés
interface LazyMotionComponentProps {
    component: ElementType;
    shouldAnimate: boolean;
    transition: Transition;
    animationProps: Pick<MotionProps, 'initial' | 'animate'>;
    className: string;
}

const LazyMotionComponent: React.FC<LazyMotionComponentProps> = ({ component: Component, shouldAnimate, transition, animationProps, className }) => {
    if (!shouldAnimate) {
        return <Component className={className} />;
    }

    const MotionComponent = motion.create(Component);
    return (
        <MotionComponent
            {...animationProps}
            transition={transition}
            className={className}
            style={{
                willChange: "transform",
                transform: "translateZ(0)",
            }}
        />
    );
};

export default OptimizedParallaxBackground;