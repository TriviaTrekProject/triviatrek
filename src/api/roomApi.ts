import {socketService} from "../ws/socketService.ts";
import {Room} from "../model/Room.ts";
import {Message} from "../model/Message.ts";

export const roomApi = {
    /**
     * Rejoindre une room de chat
     */
    async join(roomId: string, user: string): Promise<void> {
            if (!socketService.isConnected) {
                await socketService.connect();
            }
            socketService.send(`/app/join/${roomId}`, user);
    },


    /**
     * Quitter une room de chat
     */
    leave(roomId: string, user: string) {
        socketService.send(`/app/leave/${roomId}`, user);
    },

    /**
     * Envoyer un message dans la room
     */
    sendMessage(roomId: string, message: Message) {
        socketService.send(`/app/sendMessage/${roomId}`, message);
    },

    /**
     * S’abonner aux mises à jour de la room (liste des participants + messages)
     */
    onUpdate(roomId: string, handler: (room: Room) => void) {
        socketService.subscribe(`/chatroom/${roomId}`, handler);
    },

    /**
     * Se désabonner des mises à jour de la room
     */
    offUpdate(roomId: string) {
        socketService.unsubscribe(`/chatroom/${roomId}`);
    },
};

