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
import FlatButton from "./button/FlatButton.tsx";

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

    const onRoomSubscribe = useCallback(() => {
        console.log("ici ! ");
        if(!id) return;
        roomApi.join(id, username).then(() => {
            console.log("la ! ");
            setLoading(false);
            socketService.subscribe(`/game/${room?.gameId}`, (game: QuizGame) => {setQuizGame(game); setGameUsers(game.participants);})
        })
    },[id, username, room?.gameId, setQuizGame, setGameUsers, setLoading]);

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
        socketService.subscribe(`/game/${room.gameId}`, (game: QuizGame) => {setQuizGame(game); setGameUsers(game.participants);});
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

    const onAnswer = (username: string, answer: string) => {
        gameApi.submitAnswer(room?.gameId ?? "", {player: username, answer: answer})
    }

    if(isLoading) return <Spinner />;

    if (!username) {
        return <Navigate to={`/guest/${id}`} replace />;
    }

    if(isLoading) return <Spinner />;

    return (

<div className={"flex flex-col items-center justify-center gap-8 h-full w-full"}>
    {/*<div className={"w-[10rem] h-[10rem] flex bg-white rounded-2xl"}>*/}
    {/*    <img src={"src/assets/Logo.png"} alt={"logo"}/>*/}
    {/*</div>*/}

    {id && quizGame && (<>
        <div className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Mea_Culpa]">Question {quizGame?.currentQuestion?.id}</div>
        <div className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">{quizGame?.currentQuestion?.question}</div>

        </>
        )}
        <div className="rounded-2xl flex flex-row p-20 gap-20 min-w-3/4 min-h-2/5 bg-white">
            <div className="p-2"><div className={"font-bold text-tertiary mb-2"}>Utilisateurs</div> <div className="flex flex-col gap-1">{users.map((usr, index)=> (<div key={index}>{usr}{quizGame && (" : " + (quizGame.scores.find(score => score.player === usr)?.score ?? 0))}</div>))}</div></div>

            <div className={"flex grow-1 flex-col gap-6 items-center justify-center"}>

                {id && quizGame === null && (
                    <div>
                        <button className={"bg-tertiary font-bold hover:bg-secondary"} type={"button"} onClick={getOnClick(id)}>Lancer quiz</button>
                    </div>

                )}

                {id && quizGame && (
                <div className={"flex grow-1 items-center"}>
                    <div className={ "flex h-full justify-center items-center gap-x-8 flex-auto flex-row flex-wrap "}>
                    {
                            quizGame?.currentQuestion?.options.map((opt, index) => (
                                <div key={index} className={"flex basis-[calc(50%-1.5rem)]"}>
                                    <FlatButton  text={opt} onClick={() => onAnswer(username, opt)}/></div>
                            ))
                        }
                    </div>
                </div>
            )}
            </div>

            <form onSubmit={onSend} className={"bg-white border-1 flex flex-col justify-between border-solid border-primary p-8"} >

                <div className="flex justify-center mb-1 text-primary text-lg font-extrabold">Room {id}</div>

                <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-flex-start" >
                    <div className="p-2 text-left">
                        {room?.messages.map((line, index) => (
                            <div key={index}>
                                <span className="text-tertiary">{line.sender}</span>: {line.content}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={"flex flex-row gap-2 items-center justify-center w-full"}>
                    <input placeholder={"Tapez votre message ici..."} name="message" className="border-1 border-solid rounded-sm text-black p-2 focus:none" type="text"></input>
                    <button className="bg-tertiary font-bold hover:bg-secondary" type="submit">Envoyer</button>
                </div>

            </form>
        </div>
</div>
    )
}

export default Room;