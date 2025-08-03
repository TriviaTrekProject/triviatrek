import {ParticipantDTO, QuizGameDTO} from "../../model/QuizGameDTO.ts";
import {MessageDTO} from "../../model/MessageDTO.ts";

// Props communes aux deux vues (Mobile/Desktop)
export interface BaseRoomViewProps {
    roomId?: string;
    gameId?: string;
    quizGame: QuizGameDTO | null;
    users: ParticipantDTO[];
    username: string;
    messages?: MessageDTO[];
    currentParticipantId: string | null;
    handleSendJoker: () => void;
    usedJokerGlace: boolean;
    showJokerSuccessMessage?: boolean;
    effetGlace: boolean;
    onStart?: () => void;
}

// Props spécifiques au chat
export interface ChatProps {
    isChatOpen: boolean;
    toggleChat: () => void;
}

// Props complètes pour les vues
export interface RoomViewProps extends BaseRoomViewProps, ChatProps {}