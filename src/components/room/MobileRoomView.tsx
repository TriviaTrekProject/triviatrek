import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import ProgressBar from '../common/ProgressBar';
import { REVEAL_ANSWER_DELAY } from '../../hook/useRoom';
import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import {MessageDTO} from "../../model/MessageDTO.ts";
import ChatComponent from "./ChatComponent.tsx";

interface MobileRoomViewProps {
  roomId?: string;
  gameId?: string;
  quizGame: QuizGameDTO | null;
  users: string[];
  revealAnswer: boolean;
  username: string;
  onStart?: () => void;
  messages?: MessageDTO[];
}

const MobileRoomView = ({
                                                         roomId,
                                                         gameId,
                                                         quizGame,
                                                         users,
                                                         revealAnswer,
                                                         username,
                                                         onStart,
                                                         messages
}:MobileRoomViewProps) => (
  <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {revealAnswer
        ? <ProgressBar duration={REVEAL_ANSWER_DELAY}/>
        : <div className="w-full h-3"/>}
      <QuizGameHeader idRoom={roomId} quizGame={quizGame} revealAnswer={revealAnswer} messageSystem={messages?.find((message:MessageDTO) => message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`)?.content}
      />
    </div>

    <div className="rounded-2xl w-full flex flex-col p-4 gap-4 bg-transparent">
      <RoomUsers username={username} users={users} scores={quizGame?.scores ?? []}/>

      {quizGame?.currentQuestion
        ? (
          <QuizGameAnswersComponent
            idRoom={roomId!}
            gameId={gameId!}
            currentQuestion={quizGame.currentQuestion}
            username={username}
            isRevealed={revealAnswer}
          />
        )
        : (
          <StartGameButton onClick={onStart}/>
        )
      }

      <div className="mt-4">
        {/* On peut laisser le chat inline sur mobile */}
        <ChatComponent
            roomId={roomId}
            messages={messages}
            username={username}
        />
      </div>
    </div>
  </div>
);

export default MobileRoomView;
