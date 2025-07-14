import {MessageDTO} from "./MessageDTO.ts";
import {ParticipantDTO} from "./QuizGameDTO.ts";

export interface RoomDTO {

     roomId:string,

     participants: Array<ParticipantDTO>,

     messages: Array<MessageDTO>

     gameId: string;

     activeGame: boolean;

}