import React from "react";

const PirateBg: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img
            src="/PirateBg.webp"
            alt="Pirate Background"
            className={className}
        />
    );
};

export default PirateBg;
