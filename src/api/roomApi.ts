import {Room} from "../model/Room.ts";
import {httpClient} from "../config/AxiosHelps.ts";

// export async function fetchRoom( roomId:string, userName: string): Promise<Room> {
//     const res = await axios.get(`http://localhost:8080/rooms/${roomId}?user=${userName}`);
//     return res.data.results;
// }

export async function fetchRoomApi (roomId:string, userName: string): Promise<Room> {
    const response =  await httpClient.post(`/rooms/${roomId}`, {user: userName}, {
        headers: {
            "Content-Type": "text/plain",

        },
    });
    return response.data;
};