import {ParticipantDTO, ScoreDTO} from "../../model/QuizGameDTO.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import PlayerIcon from "../common/Icons/PlayerIcon.tsx";
import {useEffect, useMemo, useState} from "react";
import usePrevious from "../../hook/usePrevious.tsx";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
    id: string;
    player: string;
    diff: number;
}


const RoomUsers = ({users, scores, currentParticipantId}: {users:ParticipantDTO[], scores:ScoreDTO[], username:string, currentParticipantId:string|null} ) => {
    const isMobile = useIsMobile();
    const prevScores = usePrevious(scores); // mémorisation de l'ancien état
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (prevScores) {
            scores.forEach(score => {
                const oldScore = prevScores.find(s => s.player === score.player)?.score ?? 0;
                const diff = score.score - oldScore;
                if (diff > 0) {
                    const id = uuidv4();
                    setNotifications(prev => [...prev, { id, player: score.player, diff }]);
                    // auto-remove after animation
                    setTimeout(() => {
                        setNotifications(prev => prev.filter(n => n.id !== id));
                    }, 2000);
                }

            });
        }
    }, [prevScores, scores]); // déclenchement à chaque mise à jour de scores

    const currentUser = users.find(user => currentParticipantId === user.participantId);
    const position = useMemo(() => {return currentUser
        ? [...scores]
        .sort((a, b) => b.score - a.score)
        .findIndex(s => s.player === currentUser.username) + 1
        : null}, [currentUser, scores]);

    if(isMobile) return (

        <div className={`bg-transparent flex flex-col gap-2 px-6`}>
            <div className={`flex-row flex items-center text-white gap-2 basis-(calc(1/2-var(--spacing)*4)`}>
                <div className={"flex gap-1 shrink-0"}>
                    <div className={`flex justify-center items-center bold text-xl ${position === 1 ? 'bg-secondary-darker' : 'bg-primary'} w-8 h-8 rounded-full p-1 text-white`}>{(!scores || scores.length ===0) ? '-' : position}</div>
                    <PlayerIcon className={"h-8 w-8 rounded-full"} />
                    <div className={`flex flex-col items-start relative font-bold text-sm`}>
                        <div>{currentUser?.username}</div>
                        <span>{scores.find(s => s.player === currentUser?.username)?.score ?? 0} pts</span>
                        <AnimatePresence>
                            {notifications.filter(n => n.player === currentUser?.username).map(n => (
                                <motion.span
                                    key={n.id}
                                    initial={{ opacity: 1, x: 30, y: 0 }}
                                    animate={{ opacity: 0, x: 30, y: -20 }}
                                    transition={{ duration: 2 }}
                                    className="text-green-400 font-bold absolute right-0"
                                >
                                    +{n.diff}
                                </motion.span>
                            ))}
                        </AnimatePresence>

                    </div>
                </div>

            </div>
        </div>
    )
    
    return(
        <div className={`bg-transparent flex flex-col gap-2 ${isMobile ? 'px-6' : 'p-2'}`}>
            <div className={"font-bold text-white p-2 bg-transparent border-solid border-b-4 mb-2 border-white"}>Utilisateurs</div>
            <div className={`${isMobile ? 'flex-row flex-wrap' : 'flex-col'} flex gap-4 text-white ${isMobile ? "basis-(calc(1/2-var(--spacing)*4)" : ""}`}>
                {users.map((usr, index) =>
                {
                    const userScore = scores.find(s => s.player === usr.username)?.score ?? 0;
                    const userNotes = notifications.filter(n => n.player === usr.username);

                    return (<div
                key={index} className={`py-1 font-bold flex flex-row justify-start items-center gap-2`}>
                <div className={"flex shrink-0"}>
                    <PlayerIcon className={"h-8 w-8"} />
                </div>
                <div className={`flex flex-col items-start ${usr.participantId === currentParticipantId && 'text-secondary-dark'} relative`}>
                    <div>{usr.username}</div>
                    <span>{userScore} pts</span>
                    <AnimatePresence>
                        {userNotes.map(n => (
                            <motion.span
                                key={n.id}
                                initial={{ opacity: 1, x: 50, y: 0 }}
                                animate={{ opacity: 0, x: 50, y: -20 }}
                                transition={{ duration: 2 }}
                                className="text-green-400 font-bold absolute right-0"
                            >
                                +{n.diff}
                            </motion.span>
                        ))}
                    </AnimatePresence>

                </div>
                </div>)})}
            </div>
        </div>
    )
}

export default RoomUsers;