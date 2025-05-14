import {RoomDTO} from "../../model/RoomDTO.ts";
import {MessageDTO} from "../../model/MessageDTO.ts";
import {roomApi} from "../../api/roomApi.ts";
import {FormEvent} from "react";
import useIsMobile from "../../hook/useIsMobile.ts";

interface ChatProps {

    roomId: string | undefined,
    room: RoomDTO | null,
    username: string

}



const ChatComponent = ({roomId, room, username}:ChatProps) => {
    const isMobile = useIsMobile();

    const onSend = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!roomId) return;
        const currentMessage:MessageDTO = {
            sender: username,
            content: e.currentTarget.message.value,
            roomId: roomId ?? "",
        }
        roomApi.sendMessage(roomId, currentMessage);

        e.currentTarget.message.value = "";
    }

    return <form onSubmit={onSend}
                 className={"bg-white flex flex-col justify-between p-8 rounded-2xl"}>

        <div className="flex justify-center mb-1 text-primary text-lg font-extrabold">Room {roomId}</div>

        <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-flex-start w-full">
            <div className="p-2 text-left">
                {room?.messages.map((line, index) =>
                    (
                    <div key={index}>
                        <span className="text-tertiary">{line.sender}</span>: {line.content}
                    </div>
                ))}
            </div>
        </div>

        <div className={`flex flex-row gap-2 items-center justify-center w-full ${isMobile && 'flex-wrap'}`}>
            <input placeholder={"Tapez votre message ici..."} name="message"
                   className={`border-1 border-solid rounded-sm text-black p-2 focus:none ${isMobile && 'w-full'}`} type="text"></input>
            <button className={`justify-center bg-tertiary font-bold hover:bg-secondary flex ${isMobile && 'grow-1'}`} type="submit">Envoyer</button>
        </div>

    </form>;
}

export default ChatComponent;