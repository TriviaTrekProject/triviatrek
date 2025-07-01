import {Navigate} from "react-router-dom";
import Spinner from "./spinner/spinner.tsx";
import QuizGameAnswersComponent from "./game/QuizGameAnswersComponent.tsx";
import ChatComponent from "./room/ChatComponent.tsx";
import RoomUsers from "./room/RoomUsers.tsx";
import QuizGameHeader from "./game/QuizGameHeader.tsx";
import useIsMobile from "../hook/useIsMobile.ts";
import {REVEAL_ANSWER_DELAY, useRoom} from "../hook/useRoom.ts";
import {gameApi} from "../api/gameApi.ts";
import StartGameButton from "./game/StartGameButton.tsx";
import ProgressBar from "./common/ProgressBar.tsx";
import {useState} from "react";
import ChatIcon from "./common/Icons/ChatIcon.tsx";
import ArrowRightIcon from "./common/Icons/ArrowRightIcon.tsx";


interface ChatProps {
    username: string;
}
const onClick = (
    roomId: string | undefined,
    gameId: string,
    username: string
) => {
    if (!gameId || !roomId) return;
    return () => gameApi.startQuizGame(gameId, roomId, username);
};



const Room = ({ username }: ChatProps) => {
    const { room, quizGame, users, revealAnswer, isLoading } = useRoom(username);
    const isMobile = useIsMobile();
    const [isChatOpen, setChatOpen] = useState(false);


    if (isLoading) return <Spinner />;
    if (!username) return <Navigate to={`/guest/${room?.roomId}`} replace />;

    return(
        <>

            {isMobile ? (
        <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
            <div className={"flex flex-col items-center justify-center gap-4 h-auto w-full"}>
                {revealAnswer ? (<ProgressBar duration={REVEAL_ANSWER_DELAY}/>) :(<div className='w-full h-3'/>)}
                <QuizGameHeader idRoom={room?.roomId} quizGame={quizGame} />
            </div>
            <div className="rounded-2xl w-full flex flex-col p-4 gap-8 bg-transparent">
                <RoomUsers users={users} scores={quizGame?.scores ?? []} />
                {room && quizGame && quizGame?.currentQuestion && (
                    <QuizGameAnswersComponent
                        idRoom={room.roomId}
                        currentQuestion={quizGame.currentQuestion}
                        username={username}
                        gameId={room.gameId}
                        isRevealed={revealAnswer}
                    />
                )}

                {room && !quizGame && (
                    <StartGameButton onClick={onClick(room?.roomId, room?.gameId, username)}/>
                )}

                <ChatComponent roomId={room?.roomId} room={room} username={username} />
            </div>
        </div>
    ) : (<>

                {/* Bouton pour ouvrir/fermer le chat */}
                <button
                    className={`fixed top-1/4 right-0 z-50 h-12 rounded-b-none bg-secondary-dark text-white px-3 py-2 hover:bg-secondary-darker overflow-hidden ${isChatOpen ? 'w-80' : 'w-16'} transition-[width] duration-300`}

                    onClick={() => setChatOpen((prev) => !prev)}
                >
                    <div className={"flex flex-row gap-2 justify-center items-center"}>{isChatOpen ? <ArrowRightIcon className={"w-6 h-auto"}/> : <ChatIcon className={"w-6 h-auto"}/>}</div>
                </button>

                    {/* Panneau latéral Chat */}
                <div
                    className={
                        "fixed top-[calc(25%+48px)] flex justify-flex-end rounded-b-2xl pt-6 bg-white right-0 z-40 h-1/2 shadow-lg transform transition-transform duration-300 ease-in-out " +
                        (isChatOpen ? "translate-x-0" : "translate-x-full") +
                        " w-full sm:w-80"
                    }
                >
                    <ChatComponent roomId={room?.roomId} room={room} username={username} />
                </div>
                    <div className="flex flex-row items-center justify-center gap-4 h-full w-full">

                        <RoomUsers users={users} scores={quizGame?.scores ?? []} />
                        <div className="flex flex-col items-center justify-center gap-1 h-full w-full">
                            <div className={"flex flex-col items-center justify-center gap-4 h-auto w-full"}>
                                {revealAnswer ? (<ProgressBar duration={REVEAL_ANSWER_DELAY}/>) :(<div className='w-full h-3'/>)}
                                <QuizGameHeader idRoom={room?.roomId} quizGame={quizGame} />
                            </div>

                            <div className="rounded-2xl flex flex-row p-5 gap-20 w-full min-h-2/5 bg-transparent">
                                {room && quizGame && quizGame?.currentQuestion && (
                                    <QuizGameAnswersComponent
                                        idRoom={room.roomId}
                                        currentQuestion={quizGame.currentQuestion}
                                        username={username}
                                        gameId={room.gameId}
                                        isRevealed={revealAnswer}
                                    />
                                )}
                                {room && !quizGame && (
                                    <StartGameButton onClick={onClick(room?.roomId, room?.gameId, username)}/>
                                )}
                            </div>
                        </div>
                    </div>

                </>
    )}

            </>);
};

export default Room;
