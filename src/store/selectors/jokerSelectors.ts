import {RootState} from "../store.ts";

export const selectUsedJokers = (state: RootState) => state.game.usedJokers;
export const selectJokerSuccessMessage = (state: RootState) => state.game.jokerMessages;
