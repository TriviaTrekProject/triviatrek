import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import FlatButton from "../button/FlatButton.tsx";
import {gameApi} from "../../api/gameApi.ts";
import useIsMobile from "../../hook/useIsMobile.ts";

interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    username: string
    gameId: string,

}

const onClick = (roomId : string | undefined, gameId : string, username:string) => {
    if(!gameId || !roomId) return;
    return () => gameApi.startQuizGame(gameId ?? "", roomId, username);

}

const onAnswer = (username: string, answer: string, gameId: string | undefined) => {
    gameApi.submitAnswer(gameId ?? "", {player: username, answer: answer})
}

const StartGameButton = (props: { onClick: (() => Promise<void>) | undefined }) => {
    return <div>
        <button className={"bg-tertiary font-bold hover:bg-secondary"} type={"button"}
                onClick={props.onClick}>Lancer quiz
        </button>
    </div>;
}

const QuizGameAnswersComponent = ({idRoom, quizGame, gameId, username}:QuizGameComponentProps) => {
    const isMobile = useIsMobile();


    return <div className={"flex grow-1 flex-col gap-6 items-center justify-center w-full"}>
        {idRoom && gameId && quizGame === null && (
            <StartGameButton onClick={onClick(idRoom, gameId, username)}/>

        )}

        {idRoom && quizGame && (
            <div className={"flex grow-1 items-center w-full"}>
                {isMobile &&(
                    <div className={"flex h-auto w-full justify-center items-center gap-4 flex-auto flex-column flex-wrap "}>
                        {
                            quizGame?.currentQuestion?.options.map((opt, index) => (
                                <div key={index} className={"flex basis-full"}>
                                    <FlatButton text={opt} onClick={() => onAnswer(username, opt, quizGame?.gameId)}/>
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
                            <FlatButton text={opt} onClick={() => onAnswer(username, opt, quizGame?.gameId)}/>
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