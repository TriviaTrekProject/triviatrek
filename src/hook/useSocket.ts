import {useEffect, useRef} from 'react';
import { socketService } from '../ws/socketService';

const useSocket = (
    topic: string,
    onMessage: (payload: any) => void,
    onSubscribe: () => void,
) => {

    const isSubscribed = useRef(false);
    isSubscribed.current = false;

    useEffect(() => {
        console.log('Appel useSocket');
    }, [])

    useEffect(() => {
        if(isSubscribed.current) return;
        // 1. Connection
        if(!socketService.isConnected) {
            socketService
                .connect()
                .then(() => {
                    // 2. Souscription
                    socketService.subscribe(topic, onMessage);
                    onSubscribe();
                    isSubscribed.current = true;
                })
                .catch(err => {
                    console.error('Erreur WS →', err);
                });
        }
            else {
             socketService.subscribe(topic, onMessage);
            onSubscribe();
            isSubscribed.current = true            }

        // 3. Cleanup
        return () => {
        };
    }, [topic, onMessage, onSubscribe]);

    return isSubscribed;
}

export default useSocket;
