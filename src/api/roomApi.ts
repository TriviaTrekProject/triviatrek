import {socketService} from "../ws/socketService.ts";
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
};

