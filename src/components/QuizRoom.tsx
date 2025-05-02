import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestions, TriviaQuestion } from '../api/triviaApi';
import { createStompClient } from '../ws/socket';
import {Client} from "@stomp/stompjs"
import "tailwindcss";

interface GameMessage {
    questionId: string;
    username: string;
    answer: string;
}

interface User {
    username: string;
    selected?: string;
}


export default function QuizRoom() {
    const { id: gameId } = useParams<{ id: string }>();
    const username = localStorage.getItem('username') || '';
    const [users, setUsers] = useState<User[]>([]);
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const clientRef = useRef<Client>(null);


    useEffect(() => {

        // load questions
        fetchQuestions().then(setQuestions);
        // websocket setup
        const client = createStompClient((msg: GameMessage) => {
            setUsers(prev => {
                const updated = prev.map(u =>
                    u.username === msg.username ? { ...u, selected: msg.answer } : u
                );
                if (!updated.find(u => u.username === msg.username)) {
                    updated.push({ username: msg.username, selected: msg.answer });
                }
                return updated;
            });
        });
        clientRef.current = client;
        // announce join
        if(users.some(o => o.username !== username)) setUsers(prev => [ ...prev, { username } ]);

        return () => { client.deactivate(); };
    }, [username, users]);

    if (!questions.length) return <div>Chargement des questions...</div>;
    const q = questions[current];
    const options = [...q.incorrect_answers, q.correct_answer].sort();

    const handleSelect = (opt: string) => {
        setSelected(opt);
        // broadcast selection
        clientRef.current?.publish({
            destination: `/app/quiz`,
            body: JSON.stringify({ questionId: String(current), username, answer: opt })
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-lg mb-2">Partie {gameId}</h2>
            {/* Users list */}
            <div className="mb-4 flex space-x-2">
                {users.map(u => (
                    <span
                        key={u.username}
                        className={`px-2 py-1 rounded ${u.username === username ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                    >
            {u.username}
          </span>
                ))}
            </div>
            {/* Question */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: q.question }} />
                <div className="grid grid-cols-2 gap-2">
                    {options.map(opt => {
                        const isSelected = selected === opt;
                        return (
                            <button
                                key={opt}
                                onClick={() => handleSelect(opt)}
                                className={`border p-2 rounded text-left ${isSelected ? 'bg-blue-200' : ''}`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: opt }} />
                            </button>
                        );
                    })}
                </div>
            </div>
            {/* Selections */}
            <div>
                <h3 className="text-md mb-2">Sélections :</h3>
                {users.map(u => (
                    <div key={u.username} className="mb-1">
                        <strong>{u.username}</strong>: {u.selected || '-'}
                    </div>
                ))}
            </div>
        </div>
    );
}