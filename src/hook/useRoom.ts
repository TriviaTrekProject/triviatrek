import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { RoomDTO } from "../model/RoomDTO.ts";
import { QuizGameDTO } from "../model/QuizGameDTO.ts";
import { roomApi } from "../api/roomApi.ts";
import { gameApi } from "../api/gameApi.ts";
import { socketService } from "../ws/socketService.ts";
import useSocket from "../hook/useSocket.ts";
import useHandleUnmount from "../hook/useHandleUnmount.ts";

// Constante pour le délai de révélation des réponses
const REVEAL_ANSWER_DELAY = 3000;

// Hook personnalisé pour gérer l'état et les comportements liés à la Room
export const useRoom = (username: string) => {
    const { id } = useParams();
    const [room, setRoom] = useState<RoomDTO | null>(null);        // Stocke les données de la Room
    const [quizGame, setQuizGame] = useState<QuizGameDTO | null>(null); // Stocke les données du quiz en cours
    const [users, setUsers] = useState<string[]>([]);             // Liste des participants
    const [revealAnswer, setRevealAnswer] = useState<boolean>(false); // État pour révéler les réponses
    const [hasSubscribedToGameUpdates, setHasSubscribedToGameUpdates] = useState<boolean>(false); // Gestion des abonnements aux mises à jour
    const [isLoading, setLoading] = useState(true);               // Indique si les données sont en train de se charger

    // Déclenchée lorsqu'un utilisateur quitte la room ou l'application
    const handleUnload = useCallback(() => {
        if (id) roomApi.leave(id, username); // Appel l'API pour quitter la room
    }, [id, username]);

    // Déclenchée lorsque des données de Room sont reçues via WebSocket
    const onRoomMessage = useCallback((room: RoomDTO) => {
        setRoom(room);       // Met à jour les données de la Room
        setUsers(room.participants); // Mets à jour la liste des participants
    }, []);

    // Abonne l'utilisateur à une Room
    const onRoomSubscribe = useCallback(() => {
        if (id) {
            roomApi.join(id, username).then(() => setLoading(false)); // Stop le chargement lorsqu'abonné
        }
    }, [id, username]);

    // Gère la souscription aux mises à jour du jeu, évite les abonnements multiples
    const subscribeToGameUpdates = useCallback(() => {
        if (!id || !room?.gameId || hasSubscribedToGameUpdates) return;

        socketService.subscribe(`/game/${room.gameId}`, (game: QuizGameDTO) => {
            // Révélation des réponses si la question courante a changé
            if (game.currentQuestion?.id !== quizGame?.currentQuestion?.id) {
                setRevealAnswer(true);
                setTimeout(() => {
                    setRevealAnswer(false);
                    setQuizGame(game); // Met à jour les données du jeu
                }, REVEAL_ANSWER_DELAY);
            } else {
                setQuizGame(game); // Met à jour directement s'il n'y a pas de changement de question
            }
            setHasSubscribedToGameUpdates(true); // Marque le jeu comme "abonné"
        });
    }, [id, room?.gameId, hasSubscribedToGameUpdates, quizGame]);

    // Rejoindre la partie active s'il y en a une
    const handleJoinActiveGame = useCallback(() => {
        if (id && room?.activeGame && !quizGame) {
            gameApi.joinGame(room.gameId, username);
        }
    }, [id, room?.activeGame, room?.gameId, username, quizGame]);

    // Connexion au WebSocket de la Room
    useSocket(`/chatroom/${id}`, onRoomMessage, onRoomSubscribe);

    // Assure la déconnexion lorsque l'utilisateur quitte la Room
    useHandleUnmount(handleUnload);

    // Souscrite automatiquement aux mises à jour du jeu actif
    useEffect(subscribeToGameUpdates, [subscribeToGameUpdates]);

    // Ajoute l'utilisateur à une partie active existante
    useEffect(handleJoinActiveGame, [handleJoinActiveGame]);

    // Retourne les données de la Room et du jeu nécessaires aux composants
    return { room, quizGame, users, revealAnswer, isLoading };
};
