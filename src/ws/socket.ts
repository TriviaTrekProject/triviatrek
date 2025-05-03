import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function createStompClient(onMessage: (msg: any) => void): Client {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            client.subscribe('/user/', msg => onMessage(JSON.parse(msg.body)));
        },
        onStompError:  (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body)

        }
    });
    client.activate();
    return client;
}