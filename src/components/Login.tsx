import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl mb-6">Quiz Multijoueur</h2>
            <button
                onClick={() => navigate('/guest')}
                className="bg-green-500 text-white py-2 px-4 rounded w-60 mb-4 hover:bg-green-600">
                Jouer en tant qu'invité
            </button>
        </div>
    );
}