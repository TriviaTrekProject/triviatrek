import { useParams, Navigate } from "react-router-dom";
import Room from "./Room.tsx";

interface GuestRoomProps {
    username: string | null;
}

export default function JoinRoom({ username }: GuestRoomProps) {
    const { id } = useParams();        // on récupère l’id depuis l’URL
    if (!username) {
        // on redirige dynamiquement vers /guest/ID
        return <Navigate to={`/guest/${id ?? ""}`} replace />;
    }
    // sinon on rend bien le chat
    return <Room username={username!} />;
}
