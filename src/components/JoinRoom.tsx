import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Room from "./room/Room.tsx";

interface GuestRoomProps {
    username: string | null;
    setDisableParallax: (disable: boolean) => void;
}

export default function JoinRoom({ username, setDisableParallax }: GuestRoomProps) {
    const { id } = useParams();
    
    useEffect(() => {
        setDisableParallax(true);
        
        return () => {
            setDisableParallax(false);
        };
    }, [setDisableParallax]);

    if (!username) {
        // Redirection dynamique vers /guest/ID
        return <Navigate to={`/guest/${id ?? ""}`} replace />;
    }

    // Rendre le composant Room
    return <Room username={username!} />;
}