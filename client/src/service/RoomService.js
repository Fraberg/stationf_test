import axios from 'axios';

const url = 'api/rooms/';

class RoomService {
    // get rooms
    // static so that we don't have to instantiate the class
    static getRooms(capacity = 0) {
        return new Promise ((resolve,reject) => {
            axios.get(url, { params: { capacity } }).then((res) => {
                const data = res.data;
                resolve(
                    data.map(room => ({
                        ...room,
                        createdAt: new Date(room.createdAt),
                        updatedAt: new Date(room.updatedAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    // new room
    static insertRoom(text) {
        return axios.post(url, {
            text
        });
    }

    // delete room
    static deleteRoom(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default RoomService;