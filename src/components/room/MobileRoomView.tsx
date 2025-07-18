import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import {ParticipantDTO, QuizGameDTO} from "../../model/QuizGameDTO.ts";
import {MessageDTO} from "../../model/MessageDTO.ts";
import {useEffect, useRef, useState} from "react";
import ParallaxBackgroundIce from "../../layout/ParallaxBackgroundIce.tsx";

interface MobileRoomViewProps {
  roomId?: string;
  gameId?: string;
  quizGame: QuizGameDTO | null;
  users: ParticipantDTO[];
  username: string;
  onStart?: () => void;
  messages?: MessageDTO[];
    currentParticipantId: string | null;
    isChatOpen: boolean;
    toggleChat: () => void;
    handleSendJoker: () => void;
    usedJokerGlace: boolean;
    effetGlace:boolean;

}


const MobileRoomView = ({
                                                         roomId,
                                                         gameId,
                                                         quizGame,
                                                         users,
                                                         username,
                                                         onStart,
                                                         messages,
                            effetGlace,
                            currentParticipantId,
                            handleSendJoker,
    usedJokerGlace
}:MobileRoomViewProps) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);


    // Fermer le volet si on clique en dehors
    useEffect(() => {
        function onClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (
                drawerOpen &&
                drawerRef.current &&
                !drawerRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setDrawerOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [drawerOpen]);


    return (
        <>
        <div className={"absolute top-6 right-4 flex self-end items-center"}>
            <RoomUsers currentParticipantId={currentParticipantId} username={username} users={users} scores={quizGame?.scores ?? []}/>
        </div>

    <div className="flex flex-col items-center h-full w-full flex-start justify-center gap-8 pt-12">
      <div className="w-full h-dvh absolute -z-1 bg-black opacity-40 pointer-events-none top-0" />
      {effetGlace && (<ParallaxBackgroundIce/>)}

      <div className="flex flex-col items-center justify-center gap-8 w-full">

        <QuizGameHeader handleSendJoker={handleSendJoker} usedJokerGlace={usedJokerGlace} currentParticipantId={currentParticipantId} username={username} idRoom={roomId} quizGame={quizGame} messageSystem={messages?.find((message:MessageDTO) => message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`)?.content}
      />

    </div>

    <div className="rounded-2xl w-full flex flex-col px-2 gap-6 bg-transparent justify-center items-center">


        {quizGame?.currentQuestion
        ? (<>
                    <QuizGameAnswersComponent
                        idRoom={roomId!}
                        gameId={gameId!}
                        currentQuestion={quizGame.currentQuestion}
                        currentParticipantId={currentParticipantId}
                    /></>
        )
        : (
          <StartGameButton onClick={onStart}/>
        )
      }
    </div>
  </div>
        </>
)};

export default MobileRoomView;
