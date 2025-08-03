import {ReactNode} from "react";
import useIsMobile from "../../hook/useIsMobile.ts";

interface JokerContainerProps {
    handleSendJoker: () => void;
    children: ReactNode;
    label?: string;
    className?: string;
    isDisabled?: boolean;
}

const JokerContainer = ({
    handleSendJoker, 
    children, 
    label, 
    className, 
    isDisabled = false
}: JokerContainerProps) => {
    const isMobile = useIsMobile();
    
    const handleClick = () => {
        if (!isDisabled) {
            handleSendJoker();
        }
    };

    return (
        <div className={`border border-white/30 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-300 ${
            isDisabled 
                ? `bg-stone-500/40 ${isMobile ? "" : "opacity-60"} pointer-events-none grayscale` 
                : 'bg-white/5 hover:bg-white/10 cursor-pointer'
        }`}>
            <button 
                disabled={isDisabled} 
                className={`p-4 flex flex-col gap-2 w-full h-full ${className} ${
                    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`} 
                onClick={handleClick}
                aria-label={isDisabled ? `${label} - Déjà utilisé` : label}
            >
                {children}
                {label && (
                    <div className={`font-bold font-[Nova_Square] ${
                        isMobile ? "text-xs" : ""
                    } ${isDisabled ? 'opacity-60' : ''}`}>
                        {label}
                        {isDisabled && <span className="block text-xs opacity-75">Utilisé</span>}
                    </div>
                )}
            </button>
        </div>
    );
};

export default JokerContainer;