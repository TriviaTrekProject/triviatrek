import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import QuizIcon from "../common/Icons/QuizIcon.tsx";
import EasyIcon from "../common/Icons/EasyIcon.tsx";
import MediumIcon from "../common/Icons/MediumIcon.tsx";
import HardIcon from "../common/Icons/HardIcon.tsx";
import JokerContainer from "./JokerContainer.tsx";
import useIsMobile from "../../hook/useIsMobile.ts";
import IceIcon from "../common/Icons/IceIcon.tsx";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    messageSystem?: string,
    username: string,
    currentParticipantId: string | null,
    handleSendJoker: () => void,
    usedJokerGlace: boolean,
}


const QuizGameHeader = ({idRoom, quizGame, messageSystem, handleSendJoker, usedJokerGlace}: QuizGameComponentProps) => {

    const isMobile = useIsMobile()


    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>


                {!isMobile && (
                    <div className={`flex flex-auto flex-row flex-wrap gap-2`}>
                    <JokerContainer handleSendJoker={handleSendJoker}>
                        <IceIcon />
                    </JokerContainer>
                    </div>)}

                <div className={`flex flex-row justify-center items-center gap-4 bg-primary/50 backdrop-blur-sm border border-white/20 rounded-2xl ${isMobile ? "p-3" : "p-4"}`}>
                    <div className={`font-bold ${isMobile ? "text-sm" : "text-xl"} text-white italic text-shadow-lg`}>{quizGame?.currentQuestion?.category}</div>
                    {quizGame?.currentQuestion?.difficulty === "easy" && <EasyIcon className={`${isMobile ? "w-[75px] h-[14px]" : ""}`}  />}
                    {quizGame?.currentQuestion?.difficulty === "medium" && <MediumIcon  />}
                    {quizGame?.currentQuestion?.difficulty === "hard" && <HardIcon />}
                </div>

                <div
                    className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]"><QuizIcon className={`${isMobile ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"}`} /><span className={`px-4 bg-clip-text  text-white text-shadow-lg ${isMobile ? "text-2xl" : "text-5xl"}`}>Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span></div>

                <div
                    className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}  text-white font-[Nova_Square] text-shadow-lg`}>{quizGame?.currentQuestion?.question}</div>
                {messageSystem && (<div
                    className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl left-15 top-25 font-bold text-secondary-dark font-[Nova_Square]`}>{messageSystem}</div>)}
                {usedJokerGlace && (<div className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl left-15 top-25 font-bold text-secondary-dark font-[Nova_Square]`}>Vous avez gelé vos adversaires !</div>)}
            </>
        )}
    {idRoom && quizGame && quizGame.finished && (<>
            <div className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Nova_Square]">Partie
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