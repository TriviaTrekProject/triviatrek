import {socketService} from "../ws/socketService.ts";
import {PlayerAnswer} from "../model/PlayerAnswer.ts";
import {QuizGame} from "../model/QuizGame.ts";

export type GameCallback = (game: QuizGame) => void

export const gameApi = {

        async startGame(gameId: string, roomId: string, user: string): Promise<void> {
            if (!socketService.isConnected) {
                await socketService.connect();
            }
            console.log("Lancement de la game " + gameId + " dans la room " + roomId);
        socketService.send(`/app/game/start/${gameId}`, {roomId: roomId, user: user});
    },


    /**
     * Rejoindre une partie de quiz
     */
    async joinGame(gameId: string, user: string): Promise<void> {
        if (!socketService.isConnected) {
            await socketService.connect();
        }

        socketService.send(`/app/game/join/${gameId}`, user);
    },

    /**
     * Quitter une partie de quiz
     */
    leaveGame(gameId: string, user: string) {
        socketService.send(`/app/game/leave/${gameId}`, user);
    },

    /**
     * Soumettre une réponse à la question en cours
     */
    submitAnswer(gameId: string, answer: PlayerAnswer) {
        socketService.send(`/app/game/answer/${gameId}`, answer);
    },
};

