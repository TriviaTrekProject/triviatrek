import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import ProgressBar from '../common/ProgressBar';
import ChatPanel from './ChatPanel';
import {MessageDTO} from "../../model/MessageDTO.ts";
import ParallaxBackgroundIce from "../../layout/ParallaxBackgroundIce.tsx";
import { useAppSelector } from '../../store/hooks/typedReduxHooks';
import { selectRoom, selectUsers, selectCurrentParticipantId } from '../../store/selectors/roomSelectors';
import { selectQuizGame, selectEffetGlace } from '../../store/selectors/gameSelectors';
import { useGameActions } from '../../hook/useGameActions';
import { useUxInteraction } from '../../hook/useUxInteraction';
import {selectJokerSuccessMessage, selectUsedJokers} from "../../store/selectors/jokerSelectors.ts";
import {JOKER_GLACE_TYPE} from "../../types/consts.ts";

interface DesktopRoomViewProps {
    username: string;
}
const DesktopRoomView = ({username}:DesktopRoomViewProps) => {
    const room = useAppSelector(selectRoom);
    const users = useAppSelector(selectUsers);
    const quizGame = useAppSelector(selectQuizGame);
    const effetGlace = useAppSelector(selectEffetGlace);
    const currentParticipantId = useAppSelector(selectCurrentParticipantId);
    
    // Actions et UI state
    const { isChatOpen, toggleChat } = useUxInteraction();
    const { handleSendJoker, handleStartGame } = useGameActions(username);
    const usedJokerGlace  = useAppSelector(selectUsedJokers);
    const jokerSuccessMessage = useAppSelector(selectJokerSuccessMessage)


    return (
        <>
            <div className="w-full h-full absolute -z-1 bg-black opacity-40 pointer-events-none top-0" />
            {effetGlace && <ParallaxBackgroundIce />}
            
            <ChatPanel 
                roomId={room?.roomId}
                messages={room?.messages}
                username={username}
                isOpen={isChatOpen}
                toggleOpen={toggleChat}
            />

            <div className="flex flex-row items-center justify-center gap-16 h-full w-full">
                <RoomUsers 
                    currentParticipantId={currentParticipantId} 
                    username={username} 
                    users={users} 
                    scores={quizGame?.scores ?? []}
                />
                
                <div className="flex flex-col items-center justify-center gap-1 h-full w-full">
                    <div className="flex flex-col items-center justify-center gap-6 w-full">
                        <QuizGameHeader 
                            usedJokerGlace={usedJokerGlace[JOKER_GLACE_TYPE]}
                            showJokerSuccessMessage={jokerSuccessMessage[JOKER_GLACE_TYPE]} // Nouveau prop transmis
                            handleSendJoker={handleSendJoker} 
                            currentParticipantId={currentParticipantId} 
                            username={username} 
                            idRoom={room?.roomId}
                            quizGame={quizGame} 
                            messageSystem={room?.messages.find((message: MessageDTO) =>
                                message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`
                            )?.content}
                        />
                    </div>

                    <div className="rounded-2xl flex flex-row p-5 gap-20 w-full min-h-2/5 bg-transparent">
                        {quizGame?.currentQuestion ? (
                            <QuizGameAnswersComponent
                               idRoom={room?.roomId}
                                gameId={quizGame.gameId}
                                currentQuestion={quizGame.currentQuestion}
                                currentParticipantId={currentParticipantId}
                            />
                        ) : (
                            <StartGameButton onClick={handleStartGame} />
                        )}
                    </div>
                    
                    {quizGame?.waitingForNext ? (
                        <ProgressBar duration={10000} />
                    ) : (
                        <div className="w-full h-3" />
                    )}
                </div>
            </div>
        </>
    );
};

export default DesktopRoomView;