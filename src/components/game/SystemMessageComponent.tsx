import React from "react";
import {SystemMessageProps} from "../../types/QuizGameInterfaces.ts";

const SystemMessage: React.FC<SystemMessageProps> = ({ message, type, isMobile }) => {
    const getPositionClasses = () => {
        if (isMobile) {
            return "left-1/2 top-25 transform -translate-x-1/2";
        }
        return "left-15 top-25";
    };

    const getAriaLive = () => {
        switch (type) {
            case "success": return "assertive";
            case "warning": return "assertive";
            default: return "polite";
        }
    };

    return (
        <div
            className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl font-bold text-secondary-dark font-[Nova_Square] ${getPositionClasses()}`}
            role="alert"
            aria-live={getAriaLive()}
        >
            {message}
        </div>
    );
};

export default SystemMessage;
