import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import FlatButton from "../button/FlatButton.tsx";
import {gameApi} from "../../api/gameApi.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import {useEffect, useState} from "react";

interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    username: string
    gameId: string,
    isRevealed: boolean

}

const onClick = (roomId : string | undefined, gameId : string, username:string) => {
    if(!gameId || !roomId) return;
    return () => gameApi.startQuizGame(gameId ?? "", roomId, username);

}



const StartGameButton = (props: { onClick: (() => Promise<void>) | undefined }) => {
    return <div>
        <button className={"bg-tertiary font-bold hover:bg-secondary"} type={"button"}
                onClick={props.onClick}>Lancer quiz
        </button>
    </div>;
}

interface DelayedButtonProps {
    onClick: (() => Promise<void>),
    label: string,
    isCorrect: boolean,
    isRevealed: boolean
}

const DelayedButton = ({ onClick, label, isCorrect, isRevealed }:DelayedButtonProps) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=> {
        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 1500);
    },[label])

    return (
    <>
    <FlatButton className={!isRevealed ? 'bg-tertiary' :  (isCorrect ? 'bg-green-400 pointer-events-none' : 'bg-red-400 pointer-events-none')} disabled={isButtonDisabled}  text={label} onClick={onClick}/>
</>)

}

const QuizGameAnswersComponent = ({idRoom, quizGame, gameId, username, isRevealed}:QuizGameComponentProps) => {
    const isMobile = useIsMobile();

    const onAnswer = (username: string, answer: string, gameId: string | undefined) => {
        return gameApi.submitAnswer(gameId ?? "", {player: username, answer: answer})
    }

    return <div className={"flex grow-1 flex-col gap-6 items-center justify-center w-full"}>
        {(!gameId || !idRoom) &&  <div className={"text-primary"}>En attente de la partie...</div>}
        {(idRoom && gameId && quizGame === null) ? <StartGameButton onClick={onClick(idRoom, gameId, username)}/> : <div></div>}

        {idRoom && quizGame && (
            <div className={"flex grow-1 items-center w-full"}>
                {isMobile &&(
                    <div className={"flex h-auto w-full justify-center items-center gap-4 flex-auto flex-column flex-wrap "}>
                        {
                            quizGame?.currentQuestion?.options.map((opt, index) => (
                                <div key={index} className={"flex basis-full"}>
                                    <DelayedButton onClick={async () => onAnswer(username, opt, quizGame?.gameId)} label={opt} isCorrect={opt === quizGame?.currentQuestion?.correctAnswer} isRevealed={isRevealed}/>
                                </div>
                            ))

                        }
                    </div>
                ) }
                {!isMobile && (

                    <div className={"flex h-auto justify-center items-center gap-8 flex-auto flex-row flex-wrap w-full"}>
                {
                    quizGame?.currentQuestion?.options.map((opt, index) => (
                        <div key={index} className={"flex basis-[calc(50%-1.5rem)]"}>
                            <DelayedButton onClick={async () => onAnswer(username, opt, quizGame?.gameId)} label={opt} isCorrect={opt === quizGame?.currentQuestion?.correctAnswer} isRevealed={isRevealed}/>
                        </div>
                    ))

                }
            </div>
                    )}

            </div>
        )}
    </div>;
}

export default QuizGameAnswersComponent;