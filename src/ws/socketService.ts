import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {baseURLWS} from "../config/AxiosHelps.ts";


class SocketService {
    private client: Client;
    private subscriptions = new Map<string, StompSubscription>();

    constructor(private endpoint = baseURLWS) {
        this.client = new Client({
            webSocketFactory: () => new SockJS(this.endpoint),
            reconnectDelay: 5_000,
        });
    }

    connect(): Promise<void> {
        console.log("dans connect")
        return new Promise((res, rej) => {
            this.client.onConnect    = () => res();
            this.client.onStompError = frame => rej(frame);
            this.client.activate();
            console.log("fin connect promise")

        });

    }

    // disconnect(): void {
    //     this.subscriptions.forEach(sub => sub.unsubscribe());
    //     this.client.deactivate();
    //     this.subscriptions.clear();
    // }

    subscribe<T>(
        topic: string,
        handler: (payload: T) => void
    ): void {
        if (this.subscriptions.has(topic)) return;
        const sub = this.client.subscribe(topic, msg => {
            const data = JSON.parse(msg.body) as T;
            handler(data);
        });
        this.subscriptions.set(topic, sub);
    }


    unsubscribe(topic: string): void {
        const sub = this.subscriptions.get(topic);
        if (sub) {
            sub.unsubscribe();
        }
    }

    send<T>(destination: string, payload: T): void {
        if (!this.client.connected) return;
        this.client.publish({
            destination,
            body: JSON.stringify(payload),
        });
    }
    get isConnected(): boolean {
        return this.client.connected;
    }


}

// Singleton
export const socketService = new SocketService();
