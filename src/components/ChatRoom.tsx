import {User} from "../model/User.ts";
import {useEffect, useState} from "react";
import {StompSubscription} from "@stomp/stompjs";
import {useParams} from "react-router-dom";

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
    roomId: string;
}

const ChatRoom = ({user}:ChatRoomProps) => {
    const [chat, setChat] = useState<ChatLine[]>([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<string[]>([]);
    const {id} = useParams();

    const onSend = (e: React.FormEvent) => {
        e.preventDefault();
        const currentMessage:Message = {
            senderName: user.username,
            message: message,
            status: "MESSAGE",
            roomId: id ?? ""
        }
        user.client.publish({
            destination: `/app/message`,
            body: JSON.stringify(currentMessage)
        })
    }
    const onMessageReceived = (payload) => {
        console.log('Received message:', payload.body)
        const payloadData = JSON.parse(payload.body) as Message;
        switch (payloadData.status) {
            case 'JOIN':
                break;
                case 'MESSAGE':
                    setChat(prev => [ ...prev, {senderName: payloadData.senderName, message: payloadData.message} ]);
                    break;
        }

    }
    let subscribe:StompSubscription | undefined;
    user.client.configure({onConnect: () => {
            subscribe = user.client.subscribe('/chatroom/'+id+'/public', onMessageReceived);
        }});
    useEffect(() => {

        return () => {
            if(subscribe) subscribe.unsubscribe();
        }
    }, [subscribe]);

    return (
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2">
            <div>Chat :</div>
            <div>{chat.map(
                (line, index) => <div key={index}><span className="text-green-800">{line.senderName}</span>: {line.message}</div>
            )}</div>
            <input placeholder={"Tapez votre message ici..."} className="border-2 border-solid border-cyan-900 rounded-sm text-black p-2 focus:none" type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
            <button type="button" onClick={onSend}>Envoyer</button>
        </div>
    )
}

export default ChatRoom
