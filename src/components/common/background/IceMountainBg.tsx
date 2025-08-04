import React from "react";

const IceMountainBg: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img
            src="/IceMountainBg.svg"
            alt="Ice Moutain Background"
            className={className}
            loading={"lazy"}
        />
    );
};

export default IceMountainBg;