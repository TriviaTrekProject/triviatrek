import {FormEvent, useCallback, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {ChatRoom} from "../model/ChatRoom.ts";
import {Message} from "../model/Message.ts";
import Spinner from "./spinner/spinner.tsx";
import {useSocket} from "../hook/useSocket.ts";
import {roomApi} from "../api/roomApi.ts";
import {gameApi} from "../api/gameApi.ts";
import {QuizGame} from "../model/QuizGame.ts";
import {socketService} from "../ws/socketService.ts";
import QuizGameAnswersComponent from "./game/QuizGameAnswersComponent.tsx";
import ChatComponent from "./room/ChatComponent.tsx";

interface ChatProps {
    username: string
}


const Room = ({username}:ChatProps) => {
    const {id} = useParams();
    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [quizGame, setQuizGame] = useState<QuizGame | null>(null);
    const [users, setUsers] = useState<string[]>([]);

    const [isLoading, setLoading] = useState(true);
    // Fermeture du browser

    const getOnClick = (roomId : string | undefined) => {
        if(!room || !roomId) return;
        return () => gameApi.startGame(room?.gameId ?? "", roomId, username);

    }

    const handleUnload = useCallback(() => {
        if(!id) return;
        roomApi.leave(id, username);
    },[id, username]);

    window.addEventListener('beforeunload', handleUnload);

    useSocket('/chatroom/'+id, (room: ChatRoom) => {
        setRoom(room);
        setUsers(room.participants);
        socketService.subscribe(`/game/${room.gameId}`, (game: QuizGame) => {setQuizGame(game)});
    });



    useEffect(() => {
        if(!id) return;
        gameApi.joinGame(room?.gameId ?? "", username);
    }, [id, username, room?.gameId]);



    useEffect(() => {

        if(!id) return;

        async function joinRoom() {
            try {
                if(!id) return;
                 roomApi.join(id, username).then(() => {
                     setLoading(false);
                 })

            } catch (err) {
                console.error('Erreur joining room →', err)
            }
        }
        joinRoom()

    }, [id, username]);




    useEffect(() => {
        if(!id) return;

        // Au démontage du composant, quitter la room et fermer la connexion
        return () => {
            roomApi.leave(id, username);
            window.removeEventListener('beforeunload', handleUnload);

        };
    }, [username, id, handleUnload]);



    const onSend = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!id) return;
        const currentMessage:Message = {
            sender: username,
            content: e.currentTarget.message.value,
            roomId: id ?? "",
        }
        roomApi.sendMessage(id, currentMessage);

        e.currentTarget.message.value = "";
    }



    if(isLoading) return <Spinner />;

    if (!username) {
        return <Navigate to={`/guest/${id}`} replace />;
    }

    if(isLoading) return <Spinner />;

    return (

<div className={"flex flex-col items-center justify-center gap-8 h-full w-full"}>
    {id && quizGame && !quizGame.finished && (<>
            <div
                className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Mea_Culpa]">Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</div>
            <div
                className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">{quizGame?.currentQuestion?.question}</div>

        </>
    )}
    {id && quizGame && quizGame.finished && (<>
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
    <div className="rounded-2xl flex flex-row p-5 gap-20 min-w-3/4 min-h-2/5 bg-transparent">
        <div className="bg-white rounded-2xl">
            <div className={"font-bold text-white mb-2 px-6 py-5 pt-6 rounded-tl-2xl rounded-tr-2xl bg-primary"}>Utilisateurs</div>
            <div className="flex flex-col gap-1">{users.map((usr, index) => (<div
                key={index}>{usr}{quizGame && (" : " + (quizGame.scores.find(score => score.player === usr)?.score ?? 0))}</div>))}</div>
        </div>

        <QuizGameAnswersComponent id={id} quizGame={quizGame} onClick={getOnClick(id)} username={username}/>

        <ChatComponent onSubmit={onSend} id={id} room={room}/>
    </div>
</div>
    )
}

export default Room;