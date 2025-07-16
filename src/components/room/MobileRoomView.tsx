import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import ProgressBar from '../common/ProgressBar';
import {ParticipantDTO, QuizGameDTO} from "../../model/QuizGameDTO.ts";
import {MessageDTO} from "../../model/MessageDTO.ts";
import ChatPanel from "./ChatPanel.tsx";
import {RefObject, useEffect, useRef, useState} from "react";
import IceIcon from "../common/Icons/IceIcon.tsx";
import { motion } from 'motion/react';
import JokerContainer from "../game/JokerContainer.tsx";
import JokerIcon from "../common/Icons/JokerIcon.tsx";

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

}



interface JokerPanelProps {
    onClick: () => void;
    drawerOpen: boolean;
    handleSendJoker: () => void;
    buttonRef: RefObject<HTMLButtonElement|null>;
    drawerRef: RefObject<HTMLDivElement|null>;
}

function JokerPanel({onClick, drawerOpen, handleSendJoker, buttonRef, drawerRef}: JokerPanelProps) {
    return <>
        {/* Bouton pour ouvrir/fermer le volet */}
        <button ref={buttonRef}
            className="fixed top-4 left-4 z-40 p-2 bg-transparent text-white"
            onClick={onClick}
        >
            <JokerIcon className="w-12 h-12"/>
        </button>

        {/* Volet dépliant */}
        <motion.div
            ref={drawerRef}
            initial={{x: "-100%"}}
            animate={{x: drawerOpen ? 0 : "-100%"}}
            transition={{type: "spring", stiffness: 250, damping: 20}}
            className="fixed top-0 left-0 h-full w-auto p-4 z-50 overflow-auto"
        >
            <div className="flex flex-row flex-wrap gap-2">
                <JokerContainer
                    handleSendJoker={handleSendJoker}
                >
                    <IceIcon/>
                </JokerContainer>
                {/* ... autres boutons ou contenus du volet */}
            </div>
        </motion.div>
    </>;
}
const MobileRoomView = ({
                                                         roomId,
                                                         gameId,
                                                         quizGame,
                                                         users,
                                                         username,
                                                         onStart,
                                                         messages,
                            isChatOpen,
                            toggleChat,
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
  <div className="flex flex-col items-center justify-center gap-4 h-full w-full">

      <ChatPanel
          roomId={roomId}
          messages={messages}
          username={username}
          isOpen={isChatOpen}
          toggleOpen={toggleChat}
      />
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <RoomUsers currentParticipantId={currentParticipantId} username={username} users={users} scores={quizGame?.scores ?? []}/>

        <QuizGameHeader handleSendJoker={handleSendJoker} usedJokerGlace={usedJokerGlace} currentParticipantId={currentParticipantId} username={username} idRoom={roomId} quizGame={quizGame} messageSystem={messages?.find((message:MessageDTO) => message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`)?.content}
      />

    </div>

    <div className="rounded-2xl w-full flex flex-col px-2 gap-6 bg-transparent justify-center items-center">

        {quizGame?.waitingForNext
            ? <ProgressBar duration={10000}/>
            : <div className="w-full my-2 h-3"/>}


        {quizGame?.currentQuestion
        ? (<>
                    <JokerPanel buttonRef={buttonRef} drawerRef={drawerRef} onClick={() => setDrawerOpen(o => !o)} drawerOpen={drawerOpen}
                                handleSendJoker={handleSendJoker}/>
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
)};

export default MobileRoomView;
