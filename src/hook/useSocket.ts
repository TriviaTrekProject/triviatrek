import { useEffect } from 'react';
import { socketService } from '../ws/socketService';

export function useSocket(
    topic: string,
    onMessage: (payload: any) => void
) {
    useEffect(() => {
        // 1. Connection
        if(!socketService.isConnected) {
            socketService
                .connect()
                .then(() => {
                    // 2. Souscription
                    socketService.subscribe(topic, onMessage);
                })
                .catch(err => {
                    console.error('Erreur WS →', err);
                });
        }
            else {
                socketService.subscribe(topic, onMessage);
            }



        // 3. Cleanup
        return () => {
        };
    }, [topic, onMessage]);
}
