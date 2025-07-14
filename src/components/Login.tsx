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
        const raw = e.currentTarget.username.value.trim();
        if (raw.length === 0 || raw.length > 20) {
            alert("Le nom doit faire entre 1 et 20 caractères.");
            return;
        }
        const safeUsername = raw.replace(/[^a-zA-Z0-9_-]/g, "");
        setUsername(safeUsername);

        const roomId = id ?? Math.random().toString(36).substring(2, 12);
        setUsername(safeUsername);
        navigate(`/game/${roomId}`, { state: { username: safeUsername } });

    }
    return (

        <div className="flex items-center gap-8 justify-center h-full flex-1/2 self-center w-full">
            <form onSubmit={onSubmit} className="bg-white p-6 rounded w-80 flex flex-col justify-center items-center">
                <div className={"w-[10rem] h-[10rem] flex"}>
                    <img src={"/LogoTriviatrek.png"} alt={"logo"}/>
                </div>

                <h2 className="text-xl mb-4 font-bold text-primary">Jouer en invité</h2>
            <input
                type="text"
                placeholder="Entrez votre nom"
                name="username"
                className="border p-2 w-full mb-4 text-black rounded"
            />
            <button
                type="submit"
                className="bg-secondary-dark font-extrabold text-primary py-2 px-4 rounded w-full hover:bg-secondary-darker"
            >
                Commencer
            </button>
        </form>
    </div>)
}

export default Login;