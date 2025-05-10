import {MessageDTO} from "./MessageDTO.ts";

export interface RoomDTO {

     roomId:string,

     participants: Array<string>,

     messages: Array<MessageDTO>

     gameId: string;

     activeGame: boolean;

}