import {RefObject, useEffect, useState} from "react";
import FlatButton from "./FlatButton.tsx";
import useIsMobile from "../../../hook/useIsMobile.ts";
import {DELAY_TIME_DISABLED} from "../../../types/consts.ts";

interface DelayedButtonProps {
    onClick: (() => Promise<void>);
    label: string;
    isCorrect: boolean;
    isRevealed: boolean;
    time: number;
    ref:RefObject<HTMLDivElement>;
    isDisabled?: boolean;
    className?: string;
}

const DelayedButton = ({ onClick, label, isCorrect, isRevealed, time, ref, isDisabled, className }: DelayedButtonProps) => {
    const [hidden, setHidden] = useState(true);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setHidden(false), time);
        const timerDisable = setTimeout(() => setDisabled(false), DELAY_TIME_DISABLED);
        return () => {clearTimeout(timer); clearTimeout(timerDisable)};
    }, [label, time]);

    const buttonClass = !isRevealed
        ? "bg-primary-dark"
        : isCorrect
            ? "bg-green-400 pointer-events-none"
            : "bg-red-400 pointer-events-none";
    const isMobile = useIsMobile();

    return (

        <FlatButton
            ref={ref}
            className={`${hidden ? 'invisible' : ''} ${buttonClass} ${isMobile ? "text-xl p-2" : ""} ${className ?? ""}`}
            text={label}
            onClick={onClick}
            disabled={disabled || isDisabled}
        />
    );
};

export default DelayedButton;
