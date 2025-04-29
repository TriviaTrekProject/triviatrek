import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestions } from '../api/triviaApi';
import { createStompClient } from '../ws/socket';

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface AnswerMap {
    [questionId: string]: string;
}

export default function QuizRoom() {
    const { id: gameId } = useParams<{ id: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [answers, setAnswers] = useState<AnswerMap>({});

    useEffect(() => {
        fetchQuestions().then(setQuestions);
        const client = createStompClient(msg => {
            setAnswers(prev => ({ ...prev, [msg.questionId]: msg.answer }));
        });
        return () => client.deactivate();
    }, []);

    if (!questions.length) return <div>Chargement des questions...</div>;

    const q = questions[current];
    const options = [...q.incorrect_answers, q.correct_answer].sort();

    const sendAnswer = (ans: { questionId: number; answer: string }) => {
        // client.publish(...)
    };

    return (
        <div className="p-4">
            <h2 className="text-lg mb-2">Partie {gameId}</h2>
            <div className="bg-white p-4 rounded shadow mb-4">
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: q.question }} />
                <div className="grid grid-cols-2 gap-2">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => sendAnswer({ questionId: current, answer: opt })}
                            className="border p-2 rounded hover:bg-gray-100">
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-md mb-2">Réponses reçues :</h3>
                {Object.entries(answers).map(([qid, ans]) => (
                    <div key={qid} className="mb-1">
                        Question {qid}: <span>{ans}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}