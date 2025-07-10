import {JokerType} from "./Request/PlayerJokerRequest.ts";

export interface JokerDTO {

    jokerType: JokerType;
    username: string;
    participantId: string;
}
