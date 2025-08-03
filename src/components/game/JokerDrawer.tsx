import React from "react";
import { AnimatePresence, motion } from "motion/react";
import JokerContainer from "./JokerContainer.tsx";
import IceIcon from "../common/Icons/IceIcon.tsx";
import PirateBg from "../common/background/PirateBg.tsx";

interface JokerDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    handleSendJoker: () => void;
    usedJokerGlace: boolean;
}

const JokerDrawer: React.FC<JokerDrawerProps> = ({ 
    isOpen, 
    onOpenChange, 
    handleSendJoker,
    usedJokerGlace
}) => {
    const MotionPirateBg = motion.create(PirateBg);

    const handleJokerClick = () => {
        if (!usedJokerGlace) {
            handleSendJoker();
            onOpenChange(false);
        }
    };

    const handleOverlayClick = () => {
        onOpenChange(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40 flex bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className="flex relative justify-center items-center h-50 w-full rounded-r-2xl border-solid overflow-hidden border-white/30 rounded-xl backdrop-blur-sm shadow-lg"
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        onClick={handleContentClick}
                    >
                        <MotionPirateBg className="absolute h-full w-auto overflow-hidden" />

                        <div className="flex flex-row gap-4 h-full justify-center items-center">
                            {/* Joker Bloc de glace */}
                            <JokerContainer
                                className="flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 border-white/30 !p-2"
                                label="Bloc de glace"
                                handleSendJoker={handleJokerClick}
                                isDisabled={usedJokerGlace}
                            >
                                <IceIcon />
                            </JokerContainer>
                            
                            {/* Jokers additionnels (désactivés pour l'instant) */}
                            <JokerContainer
                                className="flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 border-white/30 !p-2"
                                label="Joker 2"
                                handleSendJoker={() => {}} // Pas d'action pour l'instant
                                isDisabled={true}
                            >
                                <IceIcon />
                            </JokerContainer>
                            
                            <JokerContainer
                                className="flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 border-white/30 !p-2"
                                label="Joker 3"
                                handleSendJoker={() => {}} // Pas d'action pour l'instant
                                isDisabled={true}
                            >
                                <IceIcon />
                            </JokerContainer>
                        </div>

                        {/* Bouton fermer */}
                        <button
                            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                            onClick={() => onOpenChange(false)}
                            aria-label="Fermer le menu des jokers"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JokerDrawer;