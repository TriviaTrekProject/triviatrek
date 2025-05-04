import {socketService} from "../ws/socketService.ts";
import {Room} from "../model/Room.ts";
import {Message} from "../model/Message.ts";

export const roomApi = {
    /**
     * Rejoindre une room de chat
     */
    async join(roomId: string, user: string): Promise<void> {
        try {
            console.log("join début");
            if (!socketService.isConnected) {
                console.log("socketService is not connected");
                await socketService.connect();
                console.log("socketService is connected");

            }
            console.log("join fin");
            socketService.send(`/app/join/${roomId}`, user);
        } catch (e) {
            console.error("join() a échoué →", e);
            throw e;    // rejette la Promise au lieu de la laisser pendante
        }
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

