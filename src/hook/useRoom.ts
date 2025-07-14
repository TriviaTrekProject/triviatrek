import {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {RoomDTO} from "../model/RoomDTO.ts";
import {QuizGameDTO} from "../model/QuizGameDTO.ts";
import {roomApi} from "../api/roomApi.ts";
import {gameApi} from "../api/gameApi.ts";
import {socketService} from "../ws/socketService.ts";
import useSocket from "../hook/useSocket.ts";
import useHandleUnmount from "../hook/useHandleUnmount.ts";
import {JokerDTO} from "../model/JokerDTO.ts";
import {JokerType} from "../model/Request/PlayerJokerRequest.ts";

// Constante pour le délai de révélation des réponses
export const REVEAL_ANSWER_DELAY = 7000;
export const DELAY_TIME_BY_OPTION = 2000;
export const DELAY_TIME_BY_QUESTION = 4000;
export const DELAY_TIME_DISABLED = 4 * DELAY_TIME_BY_OPTION + DELAY_TIME_BY_QUESTION;

// Hook personnalisé pour gérer l'état et les comportements liés à la Room
export const useRoom = (username: string) => {
    const { id } = useParams();
    const [room, setRoom] = useState<RoomDTO | null>(null);        // Stocke les données de la Room
    const [quizGame, setQuizGame] = useState<QuizGameDTO | null>(null); // Stocke les données du quiz en cours
    const [users, setUsers] = useState<string[]>([]);             // Liste des participants
    const [revealAnswer, setRevealAnswer] = useState<boolean>(false); // État pour révéler les réponses
    const [hasSubscribedToGameUpdates, setHasSubscribedToGameUpdates] = useState<boolean>(false); // Gestion des abonnements aux mises à jour
    const [isLoading, setLoading] = useState(true);               // Indique si les données sont en train de se charger
    const [effetGlace, setEffetGlace] = useState(false);
    const [currentParticipantId, setCurrentParticipantId] = useState<string | null>(null);
    const joinedRef = useRef(false);

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
        if (!joinedRef.current && id) {
            joinedRef.current = true;
            roomApi.join(id, username)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
    }, [id, username]);


    useEffect(()=> {
        setRevealAnswer(false);

    },[quizGame])

    // Gère la souscription aux mises à jour du jeu, évite les abonnements multiples
    const subscribeToGameUpdates = useCallback(() => {
        if (!id || !room?.gameId || hasSubscribedToGameUpdates) return;

        socketService.subscribe(`/game/${room.gameId}`, (game: QuizGameDTO) => {

            setQuizGame(prev => {
                if (game?.participants?.length) {
                    const participantId =
                        game.participants.find(p => p.username === username)
                            ?.participantId
                        ?? null;
                    setCurrentParticipantId(participantId);
                }


                if (!prev) {
                    setHasSubscribedToGameUpdates(true);
                    return game;
                }

                if (prev.currentQuestion?.id === game.currentQuestion?.id) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { currentQuestion, currentQuestionIndex, questions, ...partial } = game;
                    return {
                        ...partial,
                        currentQuestion: prev.currentQuestion,
                        currentQuestionIndex: prev.currentQuestionIndex,
                        questions: prev.questions,
                    };
                }

                // Question différente
                setRevealAnswer(true);
                setTimeout(() => {
                    setRevealAnswer(false);
                    setQuizGame(game);
                }, REVEAL_ANSWER_DELAY);

                // on ne change pas l'état maintenant pour attendre le timeout
                return prev;
            });
        });


    }, [id, room?.gameId, hasSubscribedToGameUpdates, username]);

    const subscribeToJokerUpdates = useCallback(() => {
        if (!id || !room?.gameId) return;
        socketService.subscribe(`/game/joker/${room.gameId}`, (joker: JokerDTO) => {
            if (joker.jokerType === JokerType.PRIORITE_REPONSE && joker.username !== username)
            {
                setEffetGlace(true)   ;
                setTimeout(()=> {
                    setEffetGlace(false);
                },8000);

            }

        });
    },[id, room?.gameId, username]);
    
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

    // Souscrit automatiquement aux mises à jour dûes aux jokers
    useEffect(subscribeToJokerUpdates, [subscribeToJokerUpdates]);

    // Retourne les données de la Room et du jeu nécessaires aux composants
    return { room, quizGame, users, revealAnswer, isLoading, effetGlace, currentParticipantId };
};
