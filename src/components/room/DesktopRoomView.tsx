import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import ProgressBar from '../common/ProgressBar';
import { REVEAL_ANSWER_DELAY } from '../../hook/useRoom';
import ChatPanel from './ChatPanel';
import {MessageDTO} from "../../model/MessageDTO.ts";
import {QuizGameDTO} from "../../model/QuizGameDTO.ts";

interface DesktopRoomViewProps {
  roomId?: string;
  gameId?: string;
  quizGame: QuizGameDTO | null;
  users: string[];
  revealAnswer: boolean;
  username: string;
  isChatOpen: boolean;
  toggleChat: () => void;
  onStart?: () => void;
  messages?: MessageDTO[];
}

const DesktopRoomView = ({
  roomId,
  gameId,
  quizGame,
  users,
  revealAnswer,
  username,
  isChatOpen,
  toggleChat,
  messages,
    onStart
}:DesktopRoomViewProps) => (
  <>
    <ChatPanel
      roomId={roomId}
      messages={messages}
      username={username}
      isOpen={isChatOpen}
      toggleOpen={toggleChat}
    />

    <div className="flex flex-row items-center justify-center gap-16 h-full w-full">
      <RoomUsers users={users} scores={quizGame?.scores ?? []}/>

      <div className="flex flex-col items-center justify-center gap-1 h-full w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {revealAnswer
            ? <ProgressBar duration={REVEAL_ANSWER_DELAY}/>
            : <div className="w-full h-3"/>}
          <QuizGameHeader idRoom={roomId} quizGame={quizGame}/>
        </div>

        <div className="rounded-2xl flex flex-row p-5 gap-20 w-full min-h-2/5 bg-transparent">
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
        </div>
      </div>
    </div>
  </>
);

export default DesktopRoomView;
