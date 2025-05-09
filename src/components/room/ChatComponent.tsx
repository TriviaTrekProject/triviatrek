import {ChatRoom} from "../../model/ChatRoom.ts";

interface ChatProps {

    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
        id: string | undefined,
    room: ChatRoom | null,

}

const ChatComponent = (props:ChatProps) => {
    return <form onSubmit={props.onSubmit}
                 className={"bg-white flex flex-col justify-between p-8 rounded-2xl"}>

        <div className="flex justify-center mb-1 text-primary text-lg font-extrabold">Room {props.id}</div>

        <div className="flex flex-row gap-1 gap-y-1 p-2 py-4 justify-flex-start">
            <div className="p-2 text-left">
                {props.room?.messages.map((line, index) =>
                    (
                    <div key={index}>
                        <span className="text-tertiary">{line.sender}</span>: {line.content}
                    </div>
                ))}
            </div>
        </div>

        <div className={"flex flex-row gap-2 items-center justify-center w-full"}>
            <input placeholder={"Tapez votre message ici..."} name="message"
                   className="border-1 border-solid rounded-sm text-black p-2 focus:none" type="text"></input>
            <button className="bg-tertiary font-bold hover:bg-secondary" type="submit">Envoyer</button>
        </div>

    </form>;
}

export default ChatComponent;