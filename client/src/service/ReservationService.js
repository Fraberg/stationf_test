import axios from 'axios';

const url = 'api/reservations/';

class ReservationService {
    // get reservations
    // static so that we don't have to instantiate the class
    static getReservations(range) {
        return new Promise ((resolve,reject) => {
            axios.get(url, { params: { range } }).then((res) => {
                const data = res.data;
                resolve(
                    data.map(reservation => ({
                        ...reservation,
                        start: new Date(reservation.start),
                        end: new Date(reservation.end),
                        createdAt: new Date(reservation.createdAt),
                        updatedAt: new Date(reservation.updatedAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

    // new reservation
    static insertReservation(room, range, selected_capacity) {
        return axios.post(url, {
            user_id: '',
            room_id: room._id,
            start: new Date(range.start.getTime() + (0 * 60 * 1000)),
            end: new Date(range.end.getTime() + (0 * 60 * 1000)),
            participants: selected_capacity
        });
    }

    // delete reservation
    static deleteReservation(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ReservationService;