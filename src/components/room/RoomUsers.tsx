import {ScoreDTO} from "../../model/QuizGameDTO.ts";
import useIsMobile from "../../hook/useIsMobile.ts";

const RoomUsers = ({users, scores}: {users:string[], scores:ScoreDTO[]} ) => {
    const isMobile = useIsMobile();

    return(
        <div className={`bg-transparent ${isMobile ? 'px-6' : 'p-2'}`}>
            <div className={"font-bold text-white p-2 bg-transparent border-solid border-b-4 mb-2 border-white"}>Utilisateurs</div>
            <div className="flex flex-col text-white gap-1">{users.map((usr, index) => (<div
                key={index} className={"py-1 font-bold"}>{usr}{scores && scores.length > 0 && (" : " + (scores.find(score => score.player === usr)?.score ?? 0) + " pts")}</div>))}</div>
        </div>
    )
}

export default RoomUsers;