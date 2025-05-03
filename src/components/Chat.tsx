import {FormEvent, useCallback, useEffect, useState} from "react";
import {User} from "../model/User.ts";
import {useParams} from "react-router-dom";
import {Room} from "../model/Room.ts";
import {IMessage, StompSubscription} from "@stomp/stompjs";
import {Message} from "../model/Message.ts";

interface ChatProps {
    user: User
}


const Chat = ({user}:ChatProps) => {
    const {id} = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [users, setUsers] = useState<string[]>([]);


    let subscribe:StompSubscription | undefined;

    const onRoomUpdated = (payload: IMessage) => {
        const parsed = JSON.parse(payload.body) as Room;
        setRoom(parsed);
        setUsers(parsed.participants);

    }

    const onSend = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const currentMessage:Message = {
            sender: user.username,
            content: e.currentTarget.message.value,
            roomId: id ?? "",
        }
        user.client.publish({
            destination: `/app/sendMessage/${id}`,
            body: JSON.stringify(currentMessage)
        })

        e.currentTarget.message.value = "";
    }
    user.client.configure({onConnect: () => {
            subscribe = user.client.subscribe('/chatroom/'+id, onRoomUpdated);
            user.client.publish({destination: `/app/join/${id}`, body: user.username
            })
        }});

    const handleUnload = useCallback(() => {
        user.client.publish({destination: `/app/leave/${id}`, body:  user.username})
        // Désinscription
        if(subscribe){
            subscribe.unsubscribe();
        }

        user.client.deactivate();

    },[id, subscribe, user.client, user.username]);

    useEffect(() => {

        return () => {
            if(subscribe) {
                console.log("unsubscribe");
                subscribe.unsubscribe();
                window.removeEventListener('beforeunload', handleUnload);
                user.client.deactivate();
            }
        }
    }, [handleUnload, subscribe, user.client]);

    window.addEventListener('beforeunload', handleUnload);

    return (

        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2 w-3/4">
            <form onSubmit={onSend} >

            <div className="mb-1">Room {id}</div>

            <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-center" >
                <div className="p-2">Utilisateurs : <div className="flex flex-col gap-1">{users.map((usr, index)=> (<div key={index}>{usr}</div>))}</div></div>
                <div className="border-r-1 border-gray-500"></div>
                <div className="p-2 text-left">
                    {room?.messages.map((line, index) => (
                        <div key={index}>
                            <span className="text-green-800">{line.sender}</span>: {line.content}
                        </div>
                    ))}
                </div>

            </div>
                <input placeholder={"Tapez votre message ici..."} name="message" className="border-2 border-solid border-cyan-900 rounded-sm text-black p-2 focus:none" type="text"></input>
                <button type="submit">Envoyer</button>
            </form>

        </div>

    )
}

export default Chat;