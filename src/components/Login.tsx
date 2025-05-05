import {useNavigate, useParams} from "react-router-dom";
import {FormEvent} from "react";

interface GuestRoomProps {
    setUsername: (username: string) => void,
}
const Login = ({setUsername}: GuestRoomProps) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (e:FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const roomId = id ?? Math.random().toString(36).substring(2, 8);
        setUsername(e.currentTarget.username.value);
        navigate(`/game/${roomId}`, { state: { username: e.currentTarget.username.value } });

    }
    return (

        <div className="flex items-center justify-center h-1/3 rounded-2xl bg-gray-100">
        <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl mb-4">Jouer en invité</h2>
            <input
                type="text"
                placeholder="Entrez votre nom"
                name="username"
                className="border p-2 w-full mb-4 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
                Commencer
            </button>
        </form>
    </div>)
}

export default Login;