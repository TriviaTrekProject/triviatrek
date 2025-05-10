import {Client} from "@stomp/stompjs";

export interface UserDTO {
    username: string;
    client : Client;
}