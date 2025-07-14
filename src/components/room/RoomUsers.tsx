import {ParticipantDTO, ScoreDTO} from "../../model/QuizGameDTO.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import PlayerIcon from "../common/Icons/PlayerIcon.tsx";

const RoomUsers = ({users, scores, currentParticipantId}: {users:ParticipantDTO[], scores:ScoreDTO[], username:string, currentParticipantId:string|null} ) => {
    const isMobile = useIsMobile();

    return(
        <div className={`bg-transparent flex flex-col ${isMobile ? 'px-6' : 'p-2'}`}>
            <div className={"font-bold text-white p-2 bg-transparent border-solid border-b-4 mb-2 border-white"}>Utilisateurs</div>
            <div className="flex flex-col text-white gap-1">{users.map((usr, index) => (<div
                key={index} className={"py-1 font-bold flex flex-row justify-start items-center gap-2"}>
                <div className={"flex shrink-0"}>
                    <PlayerIcon className={"h-8 w-8"} />
                </div>
                <div className={`flex flex-col items-start ${usr.participantId === currentParticipantId && 'text-secondary-dark'}`}>
                    <div>{usr.username}</div>
                    {scores && scores.length > 0 && ((scores.find(score => score.player === usr.username)?.score ?? 0) + " pts")}
                </div>
                </div>))}
            </div>
        </div>
    )
}

export default RoomUsers;