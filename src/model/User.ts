import {Client} from "@stomp/stompjs";

export interface User {
    username: string;
    client : Client;
}