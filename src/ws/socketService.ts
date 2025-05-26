import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {baseURLWS} from "../config/AxiosHelps.ts";


class SocketService {
    private client: Client;
    private subscriptions = new Map<string, StompSubscription>();
    private subscriptionHandlers = new Map<string, (payload: unknown) => void>();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10;
    private connectionStatus: 'connected' | 'disconnected' | 'connecting' | 'reconnecting' = 'disconnected';

    constructor(private endpoint = baseURLWS) {
        this.client = new Client({
            webSocketFactory: () => new SockJS(this.endpoint),
            reconnectDelay: 5_000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.setupConnectionHandlers();
    }

    private setupConnectionHandlers(): void {
        this.client.onWebSocketClose = () => {
            console.log('WebSocket connection closed');
            this.connectionStatus = 'disconnected';
            this.handleReconnect();
        };

        this.client.onDisconnect = () => {
            console.log('STOMP disconnected');
            this.connectionStatus = 'disconnected';
        };

        this.client.onStompError = (frame) => {
            console.error('STOMP error:', frame);
            this.connectionStatus = 'disconnected';
            this.handleReconnect();
        };

        // Handle successful reconnection
        this.client.onConnect = () => {
            if (this.connectionStatus === 'reconnecting') {
                console.log('Reconnection successful');
                this.resubscribeAll();
            }
            this.connectionStatus = 'connected';
            this.reconnectAttempts = 0;
        };
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            this.connectionStatus = 'reconnecting';
            console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

            // The client will automatically attempt to reconnect based on reconnectDelay
            if (!this.client.active) {
                this.connect().catch(err => {
                    console.error('Reconnection failed:', err);
                });
            }
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    connect(): Promise<void> {
        this.connectionStatus = 'connecting';

        return new Promise((res, rej) => {
            // Store the original onConnect handler
            const originalOnConnect = this.client.onConnect;

            // Set a temporary onConnect handler for the initial connection
            this.client.onConnect = (frame) => {
                // Restore the original onConnect handler
                this.client.onConnect = originalOnConnect;

                // Call the original handler if it exists
                if (originalOnConnect) {
                    originalOnConnect(frame);
                }

                // Resolve the promise
                res();
            };

            this.client.onStompError = frame => {
                this.connectionStatus = 'disconnected';
                rej(frame);
            };

            this.client.activate();
        });
    }

    disconnect(): void {
        this.connectionStatus = 'disconnected';
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.client.deactivate();
        this.subscriptions.clear();
        this.subscriptionHandlers.clear(); // Clear subscription handlers
        this.reconnectAttempts = 0; // Reset reconnect attempts on manual disconnect
    }

    subscribe<T>(
        topic: string,
        handler: (payload: T) => void
    ): void {
        if (this.subscriptions.has(topic)) return;

        // Store the handler for resubscription
        this.subscriptionHandlers.set(topic, handler as (payload: unknown) => void);

        const sub = this.client.subscribe(topic, msg => {
            const data = JSON.parse(msg.body) as T;
            handler(data);
        });
        this.subscriptions.set(topic, sub);
    }

    private resubscribeAll(): void {
        console.log('Resubscribing to all topics...');
        // Clear existing subscriptions as they're no longer valid
        this.subscriptions.clear();

        // Resubscribe to all topics
        this.subscriptionHandlers.forEach((handler, topic) => {
            const sub = this.client.subscribe(topic, msg => {
                const data = JSON.parse(msg.body);
                handler(data);
            });
            this.subscriptions.set(topic, sub);
        });
    }


    unsubscribe(topic: string): void {
        const sub = this.subscriptions.get(topic);
        if (sub) {
            sub.unsubscribe();
            this.subscriptions.delete(topic);
        }

        // Also remove the handler to prevent resubscription
        this.subscriptionHandlers.delete(topic);
    }

    send<T>(destination: string, payload: T): void {
        if (!this.client.connected) return;
        this.client.publish({
            destination,
            body: typeof payload !== "string" ? JSON.stringify(payload) : payload,
        });

    }
    get isConnected(): boolean {
        return this.connectionStatus === 'connected';
    }

    get connectionState(): string {
        return this.connectionStatus;
    }

    // Reset reconnection attempts counter
    resetReconnectAttempts(): void {
        this.reconnectAttempts = 0;
    }
}

// Singleton
export const socketService = new SocketService();
