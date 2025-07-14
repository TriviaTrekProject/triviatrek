import { MessageDTO } from "../../model/MessageDTO.ts";
import { roomApi } from "../../api/roomApi.ts";
import { FormEvent, useEffect, useRef } from "react";
import useIsMobile from "../../hook/useIsMobile.ts";
import DOMPurify from "dompurify";

interface ChatProps {
    roomId: string | undefined;
    messages?: Array<MessageDTO>;
    username: string;
}

const ChatComponent = ({ roomId, username, messages }: ChatProps) => {
    const isMobile = useIsMobile();
    const chatRef = useRef<HTMLDivElement>(null);

    const handleScrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        handleScrollToBottom();
    }, [messages]);

    const onSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomId) return;
        const content = e.currentTarget.message.value;
        const currentMessage: MessageDTO = {
            sender: username,
            content: content,
            roomId: roomId,
        };
        roomApi.sendMessage(roomId, currentMessage);
        e.currentTarget.message.value = "";
    };

    return (
        <form
            onSubmit={onSend}
            className="bg-white flex flex-col top-1/10 p-8 rounded-2xl min-h-[250px] max-h-[800px]"
        >
            <div className="flex justify-center mb-1 text-primary text-lg font-extrabold underline">
                Room {roomId}
            </div>

            <div
                ref={chatRef}
                className="flex flex-row grow-1 gap-1 gap-y-1 p-2 py-4 mt-5 mb-5 justify-flex-start w-full min-h-[50px] max-h-[250px] overflow-y-auto overflow-x-auto"
            >
                <div className="p-2 text-left w-full">
                    {messages?.map((line, index) => {
                        // on sanitize avant affichage
                        const safeContent = DOMPurify.sanitize(line.content);
                        if (line.sender === "SYSTEM") {
                            return (
                                <div key={index}>
                                    <span className="text-secondary-dark">{safeContent}</span>
                                </div>
                            );
                        } else if (!line.sender.startsWith("GAME_SYSTEM")) {
                            return (
                                <div key={index}>
                                    <span className="text-primary-dark">{line.sender}</span>:{" "}
                                    <span
                                        dangerouslySetInnerHTML={{ __html: safeContent }}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center w-full flex-grow-1 flex-wrap grow-0">
                <input
                    placeholder="Tapez votre message ici..."
                    name="message"
                    className={`border-1 font-[Nova_Square] border-solid rounded-sm text-black p-2 focus:none ${
                        isMobile && "w-full"
                    }`}
                    type="text"
                />
                <button
                    className={`justify-center w-full bg-primary-dark font-bold hover:bg-secondary-darker flex ${
                        isMobile && "grow-1"
                    }`}
                    type="submit"
                >
                    Envoyer
                </button>
            </div>
        </form>
    );
};

export default ChatComponent;
