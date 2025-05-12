import { useEffect, useState } from 'react';
import { socketService } from '../ws/socketService';

const useSocket = (
    topic: string,
    onMessage: (payload: any) => void,
    onSubscribe: () => void,
) => {

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        // 1. Connection
        if(!socketService.isConnected) {
            socketService
                .connect()
                .then(() => {
                    // 2. Souscription
                    socketService.subscribe(topic, onMessage);
                    onSubscribe();
                    setIsSubscribed(true);
                })
                .catch(err => {
                    console.error('Erreur WS →', err);
                });
        }
            else {
             socketService.subscribe(topic, onMessage);
            onSubscribe();
            setIsSubscribed(true);
            }



        // 3. Cleanup
        return () => {
        };
    }, [topic, onMessage, onSubscribe]);

    return isSubscribed;
}

export default useSocket;
