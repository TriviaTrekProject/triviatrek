import {QuizGameDTO} from "../../model/QuizGameDTO.ts";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
}

const QuizGameHeader = ({idRoom, quizGame}: QuizGameComponentProps) => {

    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>
                <div
                    className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Mea_Culpa]">Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</div>
                <div
                    className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">{quizGame?.currentQuestion?.question}</div>

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