import { useParams, Navigate } from "react-router-dom";
import Chat from "./Chat";

interface GuestRoomProps {
    username: string | null;
}

export default function GameRoute({ username }: GuestRoomProps) {
    const { id } = useParams();        // on récupère l’id depuis l’URL
    if (!username) {
        // on redirige dynamiquement vers /guest/ID
        return <Navigate to={`/guest/${id ?? ""}`} replace />;
    }
    // sinon on rend bien le chat
    return <Chat username={username!} />;
}
