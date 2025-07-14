import {socketService} from "../ws/socketService.ts";
import {PlayerAnswerDTO} from "../model/PlayerAnswerDTO.ts";
import {QuizGameDTO} from "../model/QuizGameDTO.ts";
import axios from "axios";
import {PlayerJokerRequest} from "../model/Request/PlayerJokerRequest.ts";

export type GameCallback = (game: QuizGameDTO) => void

export const gameApi = {

        async startQuizGame(gameId: string, roomId: string, user: string): Promise<void> {
            if (!socketService.isConnected) {
                await socketService.connect();
            }
            console.log("Lancement de la game " + gameId + " dans la room " + roomId);
        socketService.send(`/app/game/startQuiz/${gameId}`, {roomId: roomId, participantId: user});
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
    submitAnswer(gameId: string, answer: PlayerAnswerDTO) {
        socketService.send(`/app/game/answer/${gameId}`, answer);
    },
    submitJoker(gameId: string, joker: PlayerJokerRequest) {
        socketService.send(`/app/game/joker/${gameId}`, joker);
    }
    ,
    async getGame(gameId: string): Promise<QuizGameDTO> {
        const res = await axios.get(`/app/games/${gameId}`);
        return res.data.results;

    }
};

