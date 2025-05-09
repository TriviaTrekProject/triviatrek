import {QuizGame} from "../../model/QuizGame.ts";
import FlatButton from "../button/FlatButton.tsx";
import {gameApi} from "../../api/gameApi.ts";

interface QuizGameComponentProps {
    id: string | undefined,
    quizGame: QuizGame | null,
    onClick: undefined | (() => Promise<void>),
    username: string

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

const QuizGameAnswersComponent = (props: QuizGameComponentProps) => {
    return <div className={"flex grow-1 flex-col gap-6 items-center justify-center"}>

        {props.id && props.quizGame === null && (
            <StartGameButton onClick={props.onClick}/>

        )}

        {props.id && props.quizGame && (
            <div className={"flex grow-1 items-center"}>
                <div className={"flex h-full justify-center items-center gap-x-8 flex-auto flex-row flex-wrap "}>
                    {
                        props.quizGame?.currentQuestion?.options.map((opt, index) => (
                            <div key={index} className={"flex basis-[calc(50%-1.5rem)]"}>
                                <FlatButton text={opt} onClick={() => onAnswer(props.username, opt, props.quizGame?.gameId)}/>
                            </div>
                        ))

                    }
                </div>
            </div>
        )}
    </div>;
}

export default QuizGameAnswersComponent;