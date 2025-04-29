import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuestLogin() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        localStorage.setItem('username', name.trim());
        const gameId = Math.random().toString(36).substring(2, 8);
        navigate(`/game/${gameId}`);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleStart} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl mb-4">Jouer en invité</h2>
                <input
                    type="text"
                    placeholder="Entrez votre nom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border p-2 w-full mb-4 rounded" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                    Commencer
                </button>
            </form>
        </div>
    );
}