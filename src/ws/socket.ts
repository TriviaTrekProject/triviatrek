import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function createStompClient(onMessage: (msg: any) => void): Client {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            client.subscribe('/topic/quiz', msg => onMessage(JSON.parse(msg.body)));
        },
    });
    client.activate();
    return client;
}