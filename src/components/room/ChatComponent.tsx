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
                 className={"bg-white flex flex-col top-1/10 p-8 rounded-2xl min-h-[250px] max-h-[800px]"}>

        <div className="flex justify-center mb-1 text-primary text-lg font-extrabold underline">Room {roomId}</div>

        <div className="flex flex-row grow-1 gap-1 gap-y-1 p-2 py-4 mt-5 mb-5 justify-flex-start w-full min-h-[150px] overflow-y-auto overflow-x-auto">
            <div className="p-2 text-left">
                {room?.messages.map((line, index) => {

                    if(line.sender === "SYSTEM") {
                        return (
                            <div key={index}>
                                <span className="text-secondary-dark">{line.content}</span>
                            </div>
                        )
                    }

                        return (
                            <div key={index}>
                                <span className="text-primary-dark">{line.sender}</span>: {line.content}
                            </div>
                        )
                    }
                )}
            </div>
        </div>

        <div className={'flex flex-row gap-2 items-center justify-center w-full flex-grow-1 flex-wrap grow-0'}>
            <input placeholder={"Tapez votre message ici..."} name="message"
                   className={`border-1 font-[Nova_Square] border-solid rounded-sm text-black p-2 focus:none ${isMobile && 'w-full'}`} type="text"></input>
            <button className={`justify-center w-full bg-primary-dark font-bold hover:bg-secondary-darker flex ${isMobile && 'grow-1'}`} type="submit">Envoyer</button>
        </div>

    </form>;
}

export default ChatComponent;