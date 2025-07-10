import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import QuizIcon from "../common/Icons/QuizIcon.tsx";
import EasyIcon from "../common/Icons/EasyIcon.tsx";
import MediumIcon from "../common/Icons/MediumIcon.tsx";
import HardIcon from "../common/Icons/HardIcon.tsx";
import { gameApi } from "../../api/gameApi.ts";
import {JokerType, PlayerJokerRequest} from "../../model/Request/PlayerJokerRequest.ts";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    revealAnswer: boolean,
    messageSystem?: string,
    username: string
}

const handleSendJoker = (gameId:string, participantId:string|undefined, username: string) => {
    if(!gameId || !participantId) return;
    const request: PlayerJokerRequest = {
        username: username,
        jokerType: JokerType.PRIORITE_REPONSE,
        participantId: participantId
    }
    gameApi.submitJoker(gameId, request)
}
const QuizGameHeader = ({idRoom, quizGame, revealAnswer, messageSystem, username}: QuizGameComponentProps) => {

    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>
                <button className={"border-1 border-solid border-red-500 p-4"} onClick={()=>handleSendJoker(quizGame?.gameId, quizGame?.participants.find(participant => participant.username === username)?.participantId, username)}>Joker délai</button>
                <div
                    className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]"><QuizIcon /><span className={"p-4 bg-clip-text text-white"}>Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span></div>

                {quizGame?.currentQuestion?.difficulty === "easy" && <EasyIcon />}
                {quizGame?.currentQuestion?.difficulty === "medium" && <MediumIcon />}
                {quizGame?.currentQuestion?.difficulty === "hard" && <HardIcon />}

                <div
                    className={`font-bold text-3xl text-white font-[Nova_Square]`}>{quizGame?.currentQuestion?.question}</div>
                <div
                    className={`font-bold text-3xl text-secondary-dark font-[Nova_Square] ${!revealAnswer && messageSystem && 'invisible'}`}>{messageSystem}</div>
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