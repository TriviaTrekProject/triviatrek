import {FormEvent, useCallback, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {Room} from "../model/Room.ts";
import {Message} from "../model/Message.ts";
import Spinner from "./spinner/spinner.tsx";
import {useSocket} from "../hook/useSocket.ts";
import {roomApi} from "../api/roomApi.ts";

interface ChatProps {
    username: string
}


const Chat = ({username}:ChatProps) => {
    const {id} = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);
    // const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

    // Fermeture du browser

    const handleUnload = useCallback(() => {
        if(!id) return;
        // roomApi.leave(id, username);
    },[id, username]);

    window.addEventListener('beforeunload', handleUnload);

    useSocket('/chatroom/'+id, (room:Room) => {
        setRoom(room);
        setUsers(room.participants);

    });
    useEffect(() => {
        console.log("ici");

        if(!id) return;

        async function joinRoom() {
            try {
                if(!id) return;
                 roomApi.join(id, username).then(() => {
                     console.log("alo");
                     setLoading(false);
                 })
            } catch (err) {
                console.error('Erreur joining room →', err)
            }
        }
        joinRoom();

    }, [id, username]);



    useEffect(() => {
        if(!id) return;

        // Au démontage du composant, quitter la room et fermer la connexion
        return () => {
            // roomApi.leave(id, username);
            window.removeEventListener('beforeunload', handleUnload);

        };
    }, [username, id, handleUnload]);


    // const answers = useRef(shuffleArray(question.current.incorrect_answers.concat(question.current.correct_answer)));


    const onSend = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!id) return;
        const currentMessage:Message = {
            sender: username,
            content: e.currentTarget.message.value,
            roomId: id ?? "",
        }
        roomApi.sendMessage(id, currentMessage);

        e.currentTarget.message.value = "";
    }







    // if(isLoading || !questions.length) return <Spinner />;

    if (!username) {
        return <Navigate to={`/guest/${id}`} replace />;
    }

    if(isLoading) return <Spinner />;

    return (


        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2 w-3/4 font-[Roboto]">
            <form onSubmit={onSend} >

            <div className="mb-1">Room {id}</div>

                {/*<div className="mb-1">Question : {question.current.question}</div>*/}
                {/*<div className={ "flex flex-row flex-wrap justify-center"}>*/}
                {/*    {*/}
                {/*        answers.current?.map((opt, index) => (*/}
                {/*            <div key={index} className="flex p-2 flex-1/2 h-20 items-center justify-center"><div className="bg-blue-100 rounded-2xl flex-auto h-full text-center flex justify-center items-center"><span className="text-white">{opt}</span></div></div>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</div>*/}

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