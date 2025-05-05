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

interface ChatProps {
    username: string
}




const Room = ({username}:ChatProps) => {
    const {id} = useParams();
    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [quizGame, setQuizGame] = useState<QuizGame | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [gameUsers, setGameUsers] = useState<string[]>([]);

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

    });


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
        if (!room?.gameId) return;

        const topic = `/game/${room.gameId}`;
        socketService.subscribe(topic, (game: QuizGame) => {
            setQuizGame(game);
            setGameUsers(game.participants);
        });

        // si socketService.subscribe renvoie un unsubscribe, on peut le retourner ici :
        // return () => socketService.unsubscribe(topic);
    }, [room?.gameId]);




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


        <div className="bg-white p-8 rounded shadow flex flex-row justify-around gap-10 w-2/3 m-auto font-[Roboto]">
            <form onSubmit={onSend} >

            <div className="mb-1">Room {id}</div>

            <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-center" >
                <div className="p-2">Utilisateurs : <div className="flex flex-col gap-1">{users.map((usr, index)=> (<div key={index}>{usr}</div>))}</div></div>
                <div className="border-r-1 border-gray-500"></div>
                <div className="p-2 text-left">
                    {room?.messages.map((line, index) => (
                        <div key={index}>
                            <span className="text-green-800">{line.sender}</span>: {line.content}
                        </div>
                    ))}
                </div>

            </div>
                <div className={"flex flex-row gap-2 items-center justify-center"}>
                <input placeholder={"Tapez votre message ici..."} name="message" className="border-2 border-solid border-cyan-900 rounded-sm text-black p-2 focus:none" type="text"></input>
                <button className="bg-tertiary" type="submit">Envoyer</button>
                </div>

            </form>

<div className={"flex flex-col gap-6 items-center justify-center"}>
            {id && quizGame === null && (
                <div>
                    <button className={"bg-secondary"} type={"button"} onClick={getOnClick(id)}>Lancer quiz</button>
                </div>

)}
            {id && quizGame && (
                <div>

                    <div className="mb-6 mt-4 font-bold text-xl">{quizGame?.currentQuestion?.question}</div>
                    <div className={ "flex gap-6 flex-row flex-wrap justify-center"}>
                        {
                            quizGame?.currentQuestion?.options.map((opt, index) => (
                                <div key={index} className="flex p-2 flex-1/3 h-20  bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl shadow-secondary shadow-xl/30 items-center justify-center"><div className="flex-auto h-full text-center flex justify-center items-center"><span className="text-white text-2xl font-bold">{opt}</span></div></div>
                            ))
                        }
                    </div>


                </div>
            )}
</div>
        </div>

    )
}

export default Room;