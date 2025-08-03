import { QuizGameDTO } from "../model/QuizGameDTO.ts";

export type Difficulty = "easy" | "medium" | "hard";

export interface QuizGameHeaderProps {
    idRoom: string | undefined;
    quizGame: QuizGameDTO | null;
    messageSystem?: string;
    handleSendJoker: () => void;
    usedJokerGlace: boolean;
    showJokerSuccessMessage?: boolean; // Nouveau prop
    currentParticipantId?: string | null;
    username?: string;
}

export interface DifficultyIconProps {
    difficulty: Difficulty;
    className?: string;
    withLabel?: boolean;
}

export interface QuestionHeaderProps {
    question: string;
    questionIndex: number;
    category?: string;
    categoryId?: string;
    difficulty?: Difficulty; // Utilisation du type strict
    waitingForNext?: boolean;
    isMobile: boolean;
}

export interface GameOverProps {
    scores: Array<{ player: string; score: number }>;
}

export interface SystemMessageProps {
    message: string;
    type: "info" | "success" | "warning";
    isMobile: boolean;
}