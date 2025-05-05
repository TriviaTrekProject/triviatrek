import {Message} from "./Message.ts";

export interface ChatRoom {

     roomId:string,

     participants: Array<string>,

     messages: Array<Message>

     gameId: string;

}