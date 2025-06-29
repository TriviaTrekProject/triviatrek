import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import "./QuizGameHeader.css"
import QuizIcon from "../../../public/QuizIcon.tsx";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
}

const QuizGameHeader = ({idRoom, quizGame}: QuizGameComponentProps) => {

    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>
                <div
                    className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Mea_Culpa]"><QuizIcon /><span className={"p-4 bg-clip-text text-white"}>Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span></div>
                <div
                    className={`font-bold text-3xl text-white`}>{quizGame?.currentQuestion?.question}</div>

            </>
        )}
    {idRoom && quizGame && quizGame.finished && (<>
            <div className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Mea_Culpa]">Partie
                terminée !
            </div>
            <div
                className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">  {quizGame.scores.length > 0
                ? quizGame.scores
                    .reduce((best, current) => current.score > best.score ? current : best)
                    .player
                : "Personne"} a gagné !
            </div>
        </>
    )
    }
</>
)
}

export default QuizGameHeader;