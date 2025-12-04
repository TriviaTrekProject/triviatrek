import React from 'react';
import { Navigate } from 'react-router-dom';
import MobileRoomView from './MobileRoomView';
import DesktopRoomView from './DesktopRoomView';
import useIsMobile from '../../hook/useIsMobile';
import Spinner from '../spinner/spinner';
import {useRoomAndGame} from "../../hook/useRoomAndGame.ts";

interface RoomProps {
    username: string;
}

const Room: React.FC<RoomProps> = ({ username }) => {
    const isMobile = useIsMobile();
    
    const {room, isLoading} = useRoomAndGame(username);
    

    if (isLoading) return <Spinner />;
    if (!username) return <Navigate to={`/guest/${room?.roomId}`} replace />;

    return (<>{isMobile ? <MobileRoomView username={username}/> : <DesktopRoomView username={username}/>}</>);
};

export default Room;