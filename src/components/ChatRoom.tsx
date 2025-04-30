import {User} from "../model/User.ts";
import {useEffect, useState} from "react";

interface ChatRoomProps {
    user: User
}

interface ChatLine {
    senderName: string;
    message: string;
}

interface Message {
    senderName: string;
    message: string;
    status: string;
    receiverName?: string;
}

const ChatRoom = ({user}:ChatRoomProps) => {
    const [chat, setChat] = useState<ChatLine[]>([]);
    const [message, setMessage] = useState('');

    const onSend = (e: React.FormEvent) => {
        e.preventDefault();
        const currentMessage:Message = {
            senderName: user.username,
            message: message,
            status: "MESSAGE",
        }
        user.client.publish({
            destination: `/app/message`,
            body: JSON.stringify(currentMessage)
        })
    }
    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body) as Message;
        switch (payloadData.status) {
            case 'JOIN':
                break;
                case 'MESSAGE':
                    setChat(prev => [ ...prev, {senderName: payloadData.senderName, message: payloadData.message} ]);
                    break;
        }

    }

    useEffect(() => {
        if(user?.client.connected) user.client.subscribe('app/chatroom/public', msg => onMessageReceived(msg));
    }, [user.client]);

    return (
        <div>
            <div>{user.username}</div>
            <div>Chat :</div>
            <div>{chat.map(
                line => <div><li className="text-green-800">{line.senderName}</li>: {line.message}</div>
            )}</div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
            <button onClick={onSend}>Envoyer</button>
        </div>
    )
}

export default ChatRoom
