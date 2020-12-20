<template>
  <!-- FILTERS -->
  <div class="container">
    <!-- FORM -->
    <div class="form-container">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent="">
        <div class="mb-4">
          <!-- date range picker -->
          <v-date-picker
            v-model="range"
            mode="dateTime"
            :masks="masks"
            is-range
            :min-date='new Date().setHours(0,0,0,0)'
            :minute-increment="5"
          >
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <div class="datepicker-subtemplate flex flex-col sm:flex-row justify-start items-center">
                <!-- start datetime -->
                <div class="date-picker-input-wrapper relative flex-grow">
                  <p class="label-input">Début</p>
                  <input
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                  />
                </div>
                <span class="flex-shrink-0 m-2">
                </span>
                <!-- end datetime -->
                <div class="date-picker-input-wrapper relative flex-grow">
                  <p class="label-input">Fin</p>
                  <input
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                  />
                </div>
              </div>
            </template>
          </v-date-picker>
          <!-- capacity -->
          <div class="capacity">
            <p class="label-capacity">Capacité</p>
            <input v-model="capacity" type="number" step="1" min="1" required="true"/>
          </div>
          <!-- equipments -->
          <div class="equipments">
            <p class="label-equipments">Équipements</p>
            <input v-model="selectedEquipments" placeholder="TV, Retro ..."/>
          </div>
          <!-- afficher les salles réservées -->
          <div class="label-display-if-booked">
            <p class="display-if-booked">Afficher les salles réservées</p>
            <input type="checkbox" v-model="DisplayBookedRooms">
          </div>
          <!-- submit -->
          <!-- <div class="submit">
            <button>FILTRER</button>
          </div> -->
        </div>
      </form>
    </div>
    <p class="filters-synthesis">{{ synthesis }}</p>
    <hr>
    <!-- ROOMS -->
    <div class="rooms-container">
      <!-- HEADERS -->
      <div class="list-headers">
        <p class="name">Nom</p>
        <p class="capacity">Capacité</p>
        <p class="description">Description</p>
        <p class="equipments">Équipements</p>
        <p class="reservation">Réservation</p>
      </div>
      <hr>
      <!-- LIST -->
      <div v-if="loading" class="loading">
        <h2>Chargement des salles ...</h2>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div class="room"
        v-else
        v-for="(room, index) in rooms"
        v-show="
          room.capacity >= capacity
          && (!room.booked || DisplayBookedRooms)
          && (!selectedEquipments.length || room.includesSelectedEquipments)"
        v-bind:item="room"
        v-bind:index="index"
        v-bind:key="room._id"
      >
        <p class="name">{{ room.name }}</p>
        <p class="capacity">{{ room.capacity }}</p>
        <p class="description">{{ room.description }}</p>
        <!-- <p class="equipments">{{ room.equipments }}</p> -->
        <ul class="equipments">
          <li class="name"
            v-for="(equipment, index) in room.equipments"
            v-bind:item="equipment"
            v-bind:index="index"
            v-bind:key="index"
          >
           {{ equipment.name }}
          </li>
        </ul>
        <div class="reservation">
          <button v-if="!room.booked" @click="createReservation(index)">Réserver</button>
          <p v-if="!room.booked">pour {{ duration }}</p>
          <p v-if="room.booked">{{ room.bookedInfo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomService from '../service/RoomService';
import ReservationService from '../service/ReservationService';
import utils from "../utils/utils";
// import { ref } from "vue";

export default {
  name: 'RoomComponent',
  data() {
    return {
      range: {
        start: utils.roundDate(new Date(Date.now()), 5),
        end: utils.roundDate(new Date(Date.now() + (30 * 60 * 1000)), 5),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
      capacity: 2,
      selectedEquipments: '',
      DisplayBookedRooms: false,
      rooms: [],
      reservations: [],
      error: '',
      loading: true
    }
  },
  computed: {
    synthesis() {
      if (this.duration === '') {
        const errorMsg = 'Erreur : la durée de la réservation doit être supérieure ou égale à 5 minutes';
        this.setError(errorMsg);
        return errorMsg;
      }
      this.setError();
      let synthesis = `${utils.formatDate(this.range.start)} - ${utils.formatDate(this.range.end)} (${this.duration}) | ${this.capacity} places`;
      if (this.selectedEquipments != '') {
        synthesis += ` | équipée de : ${this.selectedEquipments}`;
      }
      return synthesis;
    },
    duration() {
      return utils.getDuration(this.range.start, this.range.end);
    }
  },
  async created() {
     try {
        this.rooms = await RoomService.getRooms();
        console.log('created | this.rooms', this.rooms);
        this.reservations = await ReservationService.getReservations(this.range);
        console.log('created | this.reservations', this.reservations);
        await this.filterRooms();
     } catch(err) {
      this.error = err.message;
     } finally {
       this.loading = false;
     }
  },
  watch: {
    async range() {
      this.loading = true;
      this.reservations = await ReservationService.getReservations(this.range);
      this.loading = false;
      await this.filterRooms();
    },
    async selectedEquipments() {
      await this.filterRooms();
    },
  },
  methods: {
    setError(errorMsg) {
      this.error = errorMsg;
    },
    checkIfRoomIncludesSelectedEquipments(room) {
      this.selectedEquipments.split(' ').forEach(selectedEquipement => {
        room.equipments.forEach(equipement => {
          if (equipement.name.toLowerCase().includes(selectedEquipement.toLowerCase())) {
            room.includesSelectedEquipments = true;
            return;
          }
        });
      });
    },
    async filterRooms() {
      let roomsToFilter = this.rooms;
      this.rooms = roomsToFilter.map(function(room) {
          let roomCopy = Object.assign({}, room);
          roomCopy.booked = false;
          roomCopy.includesSelectedEquipments = false;
          return roomCopy;
      });
      this.rooms.forEach(room => {
        if (this.selectedEquipments.length) {
          this.checkIfRoomIncludesSelectedEquipments(room);
        }
        this.reservations.forEach(reservation => {
          if (reservation.room_id === room._id) {
            if (reservation.start >= this.range.start && reservation.start < this.range.end) {
              room.booked = true;
              room.bookedInfo = `Réservée le ${reservation.start.getDate()} à partir de ${utils.formatTime(reservation.start)}`;
            } 
            if (reservation.end > this.range.start && reservation.end <= this.range.end) {
              room.booked = true;
              room.bookedInfo = `Réservée le ${reservation.end.getDate()} jusqu'à ${utils.formatTime(reservation.end)}`;
            }
          }
        });
      });
      // console.log('filterRooms | this.rooms', this.rooms);
    },
    async createReservation(index) {
      const room = this.rooms[index];
      console.log('createReservation(' + index.toString() + ')', room);
      if (room) {
        room.booked = true;
        room.bookedInfo = `Réservée le ${this.range.start.getDate()} à partir de ${utils.formatTime(this.range.start)}`;
        this.$swal(
          'Réservation enregistrée',
          `Du ${utils.formatDate(this.range.start)}<br>au ${utils.formatDate(this.range.end)}<br>Durée de ${this.duration}<br>Pour ${this.capacity} places (${room.capacity} au total)`,
          'success'
        )
        await ReservationService.insertReservation(
          room,
          this.range,
          this.capacity
          // https://medium.com/swlh/vue3-using-ref-or-reactive-88d47c8f6944
        );
        this.reservations = await ReservationService.getReservations(this.range);
      } else {
        this.$swal(
          'Oops...',
          'Impossible de réserver cette salle',
          'error'
        )
      }
    }
  }
}
</script>

<style scoped>
* {
  --var-color-1: #F44336;
  --var-color-2: #ededed;
}

.container {
  display: flex;
  flex-direction: column;
}

hr {
  width: 100%;
}

/* p {
  line-height: 38px;
} */

/* --- form */
/* form inputs */
.form-container {
  display: flex;
  justify-content: space-around;
}
form {
  margin-bottom: 10px;
}
.mb-4 {
  display: flex;
}
.datepicker-subtemplate {
  display: flex;
}
.date-picker-input-wrapper {
  min-width: 130px;
  width: 150px;
  padding: 0 10px;
}
.date-picker-input-wrapper > input {
  width: 100%;
  text-align: center;
}
.capacity {
  padding: 0 10px;
  width: 100px;
}
.capacity > input {
  width: 100%;
  text-align: center;
}
.equipments {
  padding: 0 10px;
  width: 100px;
}
.equipments > input {
  width: 100%;
  text-align: center;
}
.display-if-booked {
  padding: 0 10px;
  width: 200px;
}
.display-if-booked > input {
  width: 100%;
  text-align: center;
}
.submit {
  width: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* .submit > button {
  padding: 20px;
  border: 1px solid #ff00ae;
  background: #ff00ae;
  color: #fff;
  letter-spacing: 0;
} */

/* --- list */

.filters-synthesis {
  margin: 5 0px;
}

/* --- list */
* {
  --var-name-width: 0 0 15%;
  --var-capacity-width: 0 0 10%;
  --var-description-width: 0 0 15%;
  --var-equipments-width: 1;
  --var-reservation-width: 0 0 18%;
}
/* list headers */
.list-headers {
  display: flex;
  padding: 10px;
  color: var(--var-color-1);
  font-weight: bold;
}
.list-headers > p {
  margin: 5px;
}
.list-headers > .name {
  flex: var(--var-name-width);
}
.list-headers > .capacity {
  flex: var(--var-capacity-width);
}
.list-headers > .description {
  flex: var(--var-description-width);
}
.list-headers > .equipments {
  flex: var(--var-equipments-width);
}
.list-headers > .reservation {
  flex: var(--var-reservation-width);
}
/* list content */
.loading > h2 {
  color: var(--var-color-1);
  font-weight: bold;
}
.room {
  display: flex;
  margin: 0 10 10 10px;
  padding: 10px;
  border-bottom: solid 0.1em;
  border-bottom-color: var(--var-color-2);
}
.room:hover {
   background-color: var(--var-color-2);
}
.room > p {
  margin: 0 5px;
  line-height: 38px;
}
.room > li {
  margin: 0 5px;
  line-height: 38px;
}
.room > .name {
  flex: var(--var-name-width);
}
.room > .capacity {
  flex: var(--var-capacity-width);
}
.room > .description {
  flex: var(--var-description-width);
}
.room > .equipments {
  flex: var(--var-equipments-width);
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0px;
}
.room > .equipments > li {
  margin: 0 10px;
}
.room > .reservation {
  flex: var(--var-reservation-width);
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
}
.room > .reservation > p {
  margin: 0px;
}
</style>
