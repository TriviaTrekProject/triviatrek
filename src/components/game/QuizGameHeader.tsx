import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import QuizIcon from "../common/Icons/QuizIcon.tsx";
import EasyIcon from "../common/Icons/EasyIcon.tsx";
import MediumIcon from "../common/Icons/MediumIcon.tsx";
import HardIcon from "../common/Icons/HardIcon.tsx";
import { gameApi } from "../../api/gameApi.ts";
import {JokerType, PlayerJokerRequest} from "../../model/Request/PlayerJokerRequest.ts";
import JokerContainer from "./JokerContainer.tsx";
import {useCallback, useState} from "react";
import useIsMobile from "../../hook/useIsMobile.ts";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    messageSystem?: string,
    username: string,
    currentParticipantId: string | null,
}


const QuizGameHeader = ({idRoom, quizGame, messageSystem, username, currentParticipantId}: QuizGameComponentProps) => {

    const [usedJokerGlace, setUsedJokerGlace] = useState(false);
    const isMobile = useIsMobile()
    const handleSendJoker = useCallback((gameId:string, participantId:string|null, username: string) => {
        console.log(gameId, participantId, username);
        if(!gameId || !participantId) return;
        const request: PlayerJokerRequest = {
            username: username,
            jokerType: JokerType.PRIORITE_REPONSE,
            participantId: participantId
        }
        gameApi.submitJoker(gameId, request);
        setUsedJokerGlace(true);
        setTimeout(()=> {
            setUsedJokerGlace(false);
        }, 8000)
    },[]);

    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>

                <JokerContainer handleSendJoker={() => handleSendJoker(quizGame?.gameId, currentParticipantId, username)}/>

                <div
                    className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]"><QuizIcon className={`${isMobile ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"}`} /><span className={`px-4 bg-clip-text  text-white text-shadow-lg ${isMobile ? "text-2xl" : "text-5xl"}`}>Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span></div>
                <div className={"flex flex-row justify-center items-center gap-4 bg-primary/50 backdrop-blur-sm p-4 border border-white/20 rounded-2xl"}>
                    <div className={`font-bold ${isMobile ? "text-xl" : "text-2xl"} text-white italic text-shadow-lg`}>{quizGame?.currentQuestion?.category}</div>
                {quizGame?.currentQuestion?.difficulty === "easy" && <EasyIcon  />}
                {quizGame?.currentQuestion?.difficulty === "medium" && <MediumIcon  />}
                {quizGame?.currentQuestion?.difficulty === "hard" && <HardIcon />}

                </div>

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