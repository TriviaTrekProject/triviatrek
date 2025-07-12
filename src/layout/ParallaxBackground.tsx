import React from "react";
import { motion } from "motion/react";
import SkyBg from "../components/common/background/SkyBg";
import ShoreBg from "../components/common/background/ShoreBg";
import RockBg from "../components/common/background/RockBg";
import SeaBg from "../components/common/background/SeaBg";
import ShipBg from "../components/common/background/ShipBg";
import Bird1Bg from "../components/common/background/Bird1Bg";
import Bird2Bg from "../components/common/background/Bird2Bg";

const MotionSkyBg    = motion.create(SkyBg);
const MotionShoreBg  = motion.create(ShoreBg);
const MotionSeaBg    = motion.create(SeaBg);
const MotionRockBg   = motion.create(RockBg);
const MotionShipBg   = motion.create(ShipBg);
const MotionBird1Bg  = motion.create(Bird1Bg);
const MotionBird2Bg  = motion.create(Bird2Bg);

interface ParallaxBackgroundProps {
    disableAnimation?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
                                                                   disableAnimation = false,
                                                               }) => {
    const commonTransition = {
        duration: 7,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 1.5,
    };

    return (
        <div className="fixed w-full h-full overflow-hidden -z-1">
            <MotionSkyBg className="absolute h-full w-auto" />

            <MotionRockBg
                {...(!disableAnimation && {
                    initial: { x: 0 },
                    animate: { x: 75 },
                    transition: commonTransition,
                    style: {
                        willChange: "transform",
                        transform: "translateZ(0)",
                    },
                })}
                className="absolute h-full w-auto -left-20 transform-gpu [transform-box:fill-box]"
            />

            <MotionSeaBg
                {...(!disableAnimation && {
                    initial: { x: 0 },
                    animate: { x: 75 },
                    transition: commonTransition,
                    style: {
                        willChange: "transform",
                        transform: "translateZ(0)",
                    },
                })}
                className="absolute h-full w-auto -left-20 transform-gpu [transform-box:fill-box]"
            />

            <MotionBird1Bg
                {...(!disableAnimation && {
                    initial: { x: 50 },
                    animate: { x: -150 },
                    transition: { ...commonTransition, delay: 0.5 },
                    style: {
                        willChange: "transform",
                        transform: "translateZ(0)",
                    },
                })}
                className="absolute h-full w-auto [transform-box:fill-box] origin-[500px_280px] transform scale-x-[-1] transform-gpu"
            />

            <MotionBird2Bg
                {...(!disableAnimation && {
                    initial: { x: -100 },
                    animate: { x: -150 },
                    transition: { ...commonTransition, delay: 0.5 },
                    style: {
                        willChange: "transform",
                        transform: "translateZ(0)",
                    },
                })}
                className="absolute h-full w-auto transform-gpu [transform-box:fill-box]"
            />

            <MotionShipBg
                {...(!disableAnimation && {
                    initial: { x: -100 },
                    animate: { x: -275 },
                    transition: commonTransition,
                    style: {
                        willChange: "transform",
                        transform: "translateZ(0)",
                    },
                })}
                className="absolute h-full w-auto transform-gpu [transform-box:fill-box] origin-[50%_50%]"
            />

            <MotionShoreBg className="absolute h-full w-auto" />
        </div>
    );
};

export default React.memo(ParallaxBackground);
