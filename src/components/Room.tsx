import {useCallback, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {RoomDTO} from "../model/RoomDTO.ts";
import Spinner from "./spinner/spinner.tsx";
import {roomApi} from "../api/roomApi.ts";
import {gameApi} from "../api/gameApi.ts";
import {QuizGameDTO} from "../model/QuizGameDTO.ts";
import {socketService} from "../ws/socketService.ts";
import QuizGameAnswersComponent from "./game/QuizGameAnswersComponent.tsx";
import ChatComponent from "./room/ChatComponent.tsx";
import RoomUsers from "./room/RoomUsers.tsx";
import QuizGameHeader from "./game/QuizGameHeader.tsx";
import useSocket from "../hook/useSocket.ts";
import useHandleUnmount from "../hook/useHandleUnmount.ts";

interface ChatProps {
    username: string
}


const Room = ({username}:ChatProps) => {
    const {id} = useParams();
    const [room, setRoom] = useState<RoomDTO | null>(null);
    const [quizGame, setQuizGame] = useState<QuizGameDTO | null>(null);
    const [users, setUsers] = useState<string[]>([]);

    const [isListeningGame, setListeningGame] = useState<boolean>(false);

    const [isLoading, setLoading] = useState(true);


    const handleUnload = useCallback(() => {
        if(!id) return;
        roomApi.leave(id, username);
    },[id, username]);

    const onRoomMessage = useCallback((room: RoomDTO) => {
        setRoom(room);
        setUsers(room.participants);
    },[])
    
    const onRoomSubscribe = useCallback(() => {
        if (id) roomApi.join(id, username).then(() => {
            setLoading(false);
        })
    },[id, username]);

    useSocket('/chatroom/'+id, onRoomMessage, onRoomSubscribe) ;

    useHandleUnmount(handleUnload);

    useEffect(() => {
        if(!room || !id) return;
        if(!isListeningGame && room?.gameId) socketService.subscribe(`/game/${room?.gameId}`, (game: QuizGameDTO) => {
            setQuizGame(game);
            setListeningGame(true);}
        );

    }, [id, isListeningGame, quizGame, quizGame?.currentQuestion?.id, room, room?.gameId]);



    useEffect(() => {
        if(!id) return;
        if(room?.activeGame && !quizGame) gameApi.joinGame(room?.gameId ?? "", username);
    }, [id, username, room?.gameId, room?.activeGame, quizGame]);



    if(isLoading) return <Spinner />;

    if (!username) {
        return <Navigate to={`/guest/${id}`} replace />;
    }

    return (

<div className={"flex flex-col items-center justify-center gap-8 h-full w-full"}>
    <QuizGameHeader idRoom={id} quizGame={quizGame}  />
    <div className="rounded-2xl flex flex-row p-5 gap-20 min-w-3/4 min-h-2/5 bg-transparent">
        <RoomUsers users={users} scores={quizGame?.scores ?? []}/>
        {room && (<QuizGameAnswersComponent idRoom={id} quizGame={quizGame} username={username} gameId={room.gameId}/>)}
        <ChatComponent roomId={id} room={room} username={username}/>
    </div>
</div>
    )
}

export default Room;