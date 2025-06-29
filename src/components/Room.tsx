import {Navigate} from "react-router-dom";
import Spinner from "./spinner/spinner.tsx";
import QuizGameAnswersComponent from "./game/QuizGameAnswersComponent.tsx";
import ChatComponent from "./room/ChatComponent.tsx";
import RoomUsers from "./room/RoomUsers.tsx";
import QuizGameHeader from "./game/QuizGameHeader.tsx";
import useIsMobile from "../hook/useIsMobile.ts";
import {useRoom} from "../hook/useRoom.ts";


interface ChatProps {
    username: string;
}

const Room = ({ username }: ChatProps) => {
    const { room, quizGame, users, revealAnswer, isLoading } = useRoom(username);
    const isMobile = useIsMobile();

    if (isLoading) return <Spinner />;
    if (!username) return <Navigate to={`/guest/${room?.roomId}`} replace />;

    return isMobile ? (
        <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
            <QuizGameHeader idRoom={room?.roomId} quizGame={quizGame} />
            <div className="rounded-2xl w-full flex flex-col p-4 gap-8 bg-transparent">
                <RoomUsers users={users} scores={quizGame?.scores ?? []} />
                {room && (
                    <QuizGameAnswersComponent
                        idRoom={room.roomId}
                        quizGame={quizGame}
                        username={username}
                        gameId={room.gameId}
                        isRevealed={revealAnswer}
                    />
                )}
                <ChatComponent roomId={room?.roomId} room={room} username={username} />
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
            <QuizGameHeader idRoom={room?.roomId} quizGame={quizGame} />
            <div className="rounded-2xl flex flex-row p-5 gap-20 w-full min-h-2/5 bg-transparent">
                <RoomUsers users={users} scores={quizGame?.scores ?? []} />
                {room && (
                    <QuizGameAnswersComponent
                        idRoom={room.roomId}
                        quizGame={quizGame}
                        username={username}
                        gameId={room.gameId}
                        isRevealed={revealAnswer}
                    />
                )}
                <ChatComponent roomId={room?.roomId} room={room} username={username} />
            </div>
        </div>
    );
};

export default Room;
