import {Message} from "./Message.ts";

export interface Room {

     roomId:string,

     participants: Array<string>,

     messages: Array<Message>

}