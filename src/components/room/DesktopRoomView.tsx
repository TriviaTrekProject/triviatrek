import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import ProgressBar from '../common/ProgressBar';
import ChatPanel from './ChatPanel';
import {MessageDTO} from "../../model/MessageDTO.ts";
import ParallaxBackgroundIce from "../../layout/ParallaxBackgroundIce.tsx";
import {RoomViewProps} from "../../types/roomTypes/RoomViewPropsInterface.ts";
import React from "react";


const DesktopRoomView: React.FC<RoomViewProps> = ({
                                                    roomId,
                                                    gameId,
                                                    quizGame,
                                                    users,
                                                    username,
                                                    isChatOpen,
                                                    toggleChat,
                                                    onStart,
                                                    messages,
                                                    effetGlace,
                                                    currentParticipantId,
                                                    handleSendJoker,
                                                    usedJokerGlace
                                                  }) => {
  // Implémentation de la vue desktop...
  return (

  <>
    <div className="w-full h-full absolute -z-1 bg-black opacity-40 pointer-events-none top-0" />
    {effetGlace && (<ParallaxBackgroundIce/>)
    }
    <ChatPanel
        roomId={roomId}
      messages={messages}
      username={username}
      isOpen={isChatOpen}
      toggleOpen={toggleChat}
    />

    <div className="flex flex-row items-center justify-center gap-16 h-full w-full">
      <RoomUsers currentParticipantId={currentParticipantId} username={username} users={users} scores={quizGame?.scores ?? []}/>
      <div className="flex flex-col items-center justify-center gap-1 h-full w-full">
        <div className="flex flex-col items-center justify-center gap-6 w-full">

          <QuizGameHeader usedJokerGlace={usedJokerGlace} handleSendJoker={handleSendJoker} currentParticipantId={currentParticipantId} username={username} idRoom={roomId} quizGame={quizGame} messageSystem={messages?.find((message:MessageDTO) => message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`)?.content}/>

        </div>

        <div className="rounded-2xl flex flex-row p-5 gap-20 w-full min-h-2/5 bg-transparent">
          {quizGame?.currentQuestion
            ? (
              <QuizGameAnswersComponent
                idRoom={roomId!}
                gameId={gameId!}
                currentQuestion={quizGame.currentQuestion}
                currentParticipantId={currentParticipantId}
              />
            )
            : (
              <StartGameButton onClick={onStart}/>
            )
          }
        </div>
        {quizGame?.waitingForNext
            ? <ProgressBar duration={10000}/>
            : <div className="w-full h-3"/>}

      </div>
    </div>
  </>
  );
};


export default DesktopRoomView;