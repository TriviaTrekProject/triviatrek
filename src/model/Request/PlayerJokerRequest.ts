export enum JokerType {
    PRIORITE_REPONSE = "PRIORITE_REPONSE",
    ANNULER_JOUEUR = "ANNULER_JOUEUR"
}

export interface PlayerJokerRequest {
    jokerType: JokerType;
    participantId: string;
    username: string;
}
