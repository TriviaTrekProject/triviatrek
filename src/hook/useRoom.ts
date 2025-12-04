import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/typedReduxHooks';
import { setLoading } from '../slices/UxInteractionSlice.ts';
import useSocket from './useSocket';
import useHandleUnmount from './useHandleUnmount';
import { RoomDTO } from '../model/RoomDTO';
import { v4 as uuidv4 } from 'uuid';
import {clearRoom, joinRoom, leaveRoom, setTempId, updateRoom} from "../slices/RoomSlice.ts";

export const useRoom = (username: string) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Sélecteurs Redux
  const { room, users, currentParticipantId, hasJoined, isLoading, error } = useAppSelector((state) => state.room);
  const joinedRef = useRef(false);

  // Générer un ID temporaire au montage du composant
  useEffect(() => {
    const tempId = uuidv4();
    dispatch(setTempId(tempId));
  }, [dispatch]);

  // Callback WebSocket pour les mises à jour de room
  const onRoomMessage = useCallback((roomDTO: RoomDTO) => {
    dispatch(updateRoom(roomDTO));
  }, [dispatch]);

  // Callback de souscription WebSocket
  const onRoomSubscribe = useCallback(() => {
    if (!joinedRef.current && id && username) {
      joinedRef.current = true;
      dispatch(setLoading(true));

      // Générer un nouvel ID temporaire pour cette session
      const tempId = uuidv4();
      dispatch(setTempId(tempId));

      // Rejoindre la room via Redux thunk
      dispatch(joinRoom({ roomId: id, username, tempId }))
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [id, username, dispatch]);

  // Gérer la déconnexion
  const handleUnload = useCallback(() => {
    if (id && username) {
      dispatch(leaveRoom({ roomId: id, username }));
    }
  }, [id, username, dispatch]);

  // Nettoyer l'état au démontage
  useEffect(() => {
    return () => {
      dispatch(clearRoom());
    };
  }, [dispatch]);

  // Connexion WebSocket
  useSocket(`/chatroom/${id}`, onRoomMessage, onRoomSubscribe);

  // Gérer la déconnexion proprement
  useHandleUnmount(handleUnload);

  return {
    room,
    users,
    currentParticipantId,
    isLoading,
    error,
    hasJoined,
  };
};
