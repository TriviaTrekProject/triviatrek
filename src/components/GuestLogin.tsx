import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface GuestLoginProps {
    setUsername: (username: string) => void;
}
export default function GuestLogin({setUsername}: GuestLoginProps) {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setUsername(name.trim());
        const roomId = id ?? Math.random().toString(36).substring(2, 8);
        navigate(`/game/${roomId}`);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl mb-4">Jouer en invité</h2>
                <input
                    type="text"
                    placeholder="Entrez votre nom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
                >
                    Commencer
                </button>
            </form>
        </div>
    );
}