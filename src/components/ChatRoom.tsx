import {User} from "../model/User.ts";
import {useCallback, useEffect, useState} from "react";
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
    let subscribe:StompSubscription | undefined;


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

    const sendJoinMessage = () => {
        const joinMessage:Message = {
            senderName: user.username,
            message: "",
            status: "JOIN",
            roomId: id ?? ""
        }
        user.client.publish({
            destination: `/app/message`,
            body: JSON.stringify(joinMessage)
        })

    }

    const sendLeaveMessage = useCallback(() => {
        const joinMessage:Message = {
            senderName: user.username,
            message: "",
            status: "LEAVE",
            roomId: id ?? ""
        }
        user.client.publish({
            destination: `/app/message`,
            body: JSON.stringify(joinMessage)
        })

    },[user.username, user.client, id]);

    const onMessageReceived = (payload) => {
        console.log('Received message:', payload.body)
        const payloadData = JSON.parse(payload.body) as Message;
        switch (payloadData.status) {
            case 'JOIN': {
                setUsers(prev => [...prev, payloadData.senderName]);
                setChat(prev => [ ...prev, {senderName: payloadData.senderName, message: "a rejoint la partie"} ]);
                break;}

            case 'MESSAGE': {
                setChat(prev => [...prev, {senderName: payloadData.senderName, message: payloadData.message}]);
                break;
                }

            case 'LEAVE': {
                setUsers(prev => [...prev.filter(name => name === payloadData.senderName)]);
                setChat(prev => [...prev, {senderName: payloadData.senderName, message: "a quitté la partie"}]);
            }


        }

    }
    const handleUnload = useCallback(() => {
        sendLeaveMessage();

        // Désinscription
        if(subscribe){
            subscribe.unsubscribe();
        }

        user.client.deactivate();

    },[sendLeaveMessage, subscribe, user.client]);

    user.client.configure({onConnect: () => {
            subscribe = user.client.subscribe('/chatroom/'+id+'/public', onMessageReceived);
            sendJoinMessage();
        }});
    useEffect(() => {

        return () => {
            if(subscribe) {
                console.log("unsubscribe");
                subscribe.unsubscribe();
                window.removeEventListener('beforeunload', handleUnload);
                user.client.deactivate();
                // subscribe.unsubscribe()
            }
        }
    }, [handleUnload, sendLeaveMessage, subscribe, user.client]);

    window.addEventListener('beforeunload', handleUnload);
    return (
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2 w-3/4">
           <div className="mb-1">Room {id}</div>
                <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-center" >
                    <div className="p-2">Utilisateurs : <div className="flex flex-col gap-1">{users.map((user,index) => (<div key={index}>{user}</div>))}</div></div>
                    <div className="border-r-1 border-gray-500"></div>
                    <div className="p-2">{chat.map(
                        (line, index) => <div key={index}><span className="text-green-800">{line.senderName}</span>: {line.message}</div>
                    )}</div>

            </div>
            <input placeholder={"Tapez votre message ici..."} className="border-2 border-solid border-cyan-900 rounded-sm text-black p-2 focus:none" type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
            <button type="button" onClick={onSend}>Envoyer</button>
        </div>
    )
}

export default ChatRoom
