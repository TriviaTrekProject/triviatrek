import {RefObject, useEffect, useState} from "react";
import {DELAY_TIME_DISABLED} from "../../hook/useRoom.ts";
import FlatButton from "./FlatButton.tsx";

interface DelayedButtonProps {
    onClick: (() => Promise<void>);
    label: string;
    isCorrect: boolean;
    isRevealed: boolean;
    time: number;
    ref:RefObject<HTMLDivElement>
}

const DelayedButton = ({ onClick, label, isCorrect, isRevealed, time, ref }: DelayedButtonProps) => {
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

    return (

        <FlatButton
            ref={ref}
            className={`${hidden ? 'invisible' : ''} ${buttonClass}`}
            text={label}
            onClick={onClick}
            disabled={disabled}
        />
    );
};

export default DelayedButton;
