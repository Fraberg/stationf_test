<template>
  <!-- FILTERS -->
  <div class="container">
    <!-- FORM -->
    <div class="form-container">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent="">
        <div class="mb-4">
          <!-- date range picker -->
          <v-date-picker
            v-model="ca_range"
            mode="dateTime"
            :masks="ca_masks"
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
            <input v-model="ca_selectedCapacity" type="number" step="1" min="1" required="true"/>
          </div>
          <!-- equipments -->
          <div class="equipments">
            <p class="label-equipments">Équipements</p>
            <input v-model="ca_selectedEquipments" placeholder="TV, Retro ..."/>
          </div>
          <!-- afficher les salles réservées -->
          <div class="label-display-if-booked">
            <p class="display-if-booked">Afficher les salles réservées</p>
            <input type="checkbox" v-model="ca_displayBookedRooms">
          </div>
          <!-- submit -->
          <!-- <div class="submit">
            <button>FILTRER</button>
          </div> -->
        </div>
      </form>
    </div>
    <p class="filters-synthesis">{{ getSynthesis }}</p>
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
      <div v-if="ca_isLoading" class="loading">
        <h2>Chargement des salles ...</h2>
      </div>
      <div v-else-if="ca_error" class="error">
        <p>{{ ca_error }}</p>
      </div>
      <div class="room"
        v-else
        v-for="(room, index) in ca_rooms"
        v-show="
          room.capacity >= ca_selectedCapacity
          && (ca_displayBookedRooms || !room.booked)
          && (!ca_selectedEquipments.length || room.includesSelectedEquipments)"
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
          <p v-if="!room.booked">pour {{ getRangeSpan }}</p>
          <p v-if="room.booked">{{ room.bookedInfo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomService from '../service/RoomService';
import ReservationService from '../service/ReservationService';
import { onBeforeMount } from 'vue';

// import SearchRoomsComponent from './components/SearchRoomsComponent.vue';
// import DisplayRoomsComponent from './components/DisplayRoomsComponent.vue';

import utils from "../utils/utils";
import { ref, computed, watch } from 'vue';
const Swal = require('sweetalert2');

export default {
  name: 'RoomComponent',
  // components: {
  //   SearchRoomsComponent,
  //   DisplayRoomsComponent,
  // },
  setup() {
    // init refs
    const ca_rooms = ref([]);
    const ca_selectedCapacity = ref(2);
    const ca_selectedEquipments = ref('');
    const ca_displayBookedRooms = ref(false);
    const ca_error = ref('');
    const ca_isLoading = ref(true);
    const ca_reservations = ref([]);
    const ca_range = ref({
      start: utils.roundDate(new Date(Date.now()), 5),
      end: utils.roundDate(new Date(Date.now() + (30 * 60 * 1000)), 5)
    });
    const ca_masks = { input: 'YYYY-MM-DD h:mm A' };
    // API calls before mounted
    onBeforeMount(async () => {
      console.log("Before mount");
      try {
        ca_rooms.value = await RoomService.getRooms();
        // console.log('onBeforeMount | ca_rooms', ca_rooms);
        ca_reservations.value = await ReservationService.getReservations(ca_range.value);
        // console.log('onBeforeMount | ca_reservations', ca_reservations);
        filterRooms();
      } catch(err) {
        ca_error.value = err.message;
      } finally {
        ca_isLoading.value = false;
      }
    });
    // computed
    const getSynthesis = computed(function() {
      if (getRangeSpan.value === '') {
        const errorMsg = 'La durée de la réservation doit être supérieure ou égale à 5 minutes';
        return errorMsg;
      }
      let synthesis = `${utils.formatDate(ca_range.value.start)} - ${utils.formatDate(ca_range.value.end)} (${getRangeSpan.value}) | ${ca_selectedCapacity.value} places`;
      synthesis += (ca_selectedEquipments.value !== '') ? ` | équipée de : ${ca_selectedEquipments.value}` : '';
      return synthesis;
    });
    const getRangeSpan = computed(function() {
      return utils.getDuration(ca_range.value.start, ca_range.value.end);
    });
    // watch
    watch(ca_range, async () => {
      ca_isLoading.value = true;
      if (getRangeSpan.value === '') {
        setError(getSynthesis.value);
        Swal.fire('Oops...', getSynthesis.value, 'error');
        ca_isLoading.value = false;
      } else {
        setError();
        ca_reservations.value = await ReservationService.getReservations(ca_range.value);
        ca_isLoading.value = false;
        filterRooms();
      }
    }, { immediate: true });
    watch(ca_selectedEquipments, async () => {
      filterRooms();
    }, { immediate: true });
    // methods
    function setError(errorMsg) {
      ca_error.value = errorMsg;
    }
    function checkIfRoomIncludesSelectedEquipments(room) {
      ca_selectedEquipments.value.split(' ').forEach(selectedEquipement => {
        room.equipments.forEach(equipement => {
          if (equipement.name.toLowerCase().includes(selectedEquipement.toLowerCase())) {
            room.includesSelectedEquipments = true;
            return;
          }
        });
      });
    }
    function filterRooms() {
      let roomsToFilter = ca_rooms.value;
      ca_rooms.value = roomsToFilter.map(function(room) {
          let roomCopy = Object.assign({}, room);
          roomCopy.booked = false;
          roomCopy.includesSelectedEquipments = false;
          return roomCopy;
      });
      ca_rooms.value.forEach(room => {
        if (ca_selectedEquipments.value.length) {
          checkIfRoomIncludesSelectedEquipments(room);
        }
        ca_reservations.value.forEach(reservation => {
          if (reservation.room_id === room._id) {
            if (reservation.start >= ca_range.value.start && reservation.start < ca_range.value.end) {
              room.booked = true;
              room.bookedInfo = `Réservée le ${reservation.start.getDate()} à partir de ${utils.formatTime(reservation.start)}`;
            } 
            if (reservation.end > ca_range.value.start && reservation.end <= ca_range.value.end) {
              room.booked = true;
              room.bookedInfo = `Réservée jusqu'au ${reservation.end.getDate()} à ${utils.formatTime(reservation.end)}`;
            }
          }
        });
      });
      // console.log('filterRooms | ca_rooms', ca_rooms);
    }
    async function createReservation(index) {
      const room = ca_rooms.value[index];
      // console.log('createReservation(' + index.toString() + ')', room);
      if (room) {
        room.booked = true;
        room.bookedInfo = `Réservée le ${ca_range.value.start.getDate()} à partir de ${utils.formatTime(ca_range.value.start)}`;
        Swal.fire(
          'Réservation enregistrée',
          `Du ${utils.formatDate(ca_range.value.start)}<br>au ${utils.formatDate(ca_range.value.end)}<br>Durée de ${getRangeSpan.value}<br>Pour ${ca_selectedCapacity.value} places (${room.capacity} au total)`,
          'success'
        )
        await ReservationService.insertReservation(
          room,
          ca_range.value,
          ca_selectedCapacity.value
          // https://medium.com/swlh/vue3-using-ref-or-reactive-88d47c8f6944
        );
        ca_reservations.value = await ReservationService.getReservations(ca_range.value);
      } else {
        Swal.fire('Oops...', 'Impossible de réserver cette salle', 'error');
      }
    }
    // end setup
    return {
      ca_rooms,
      ca_selectedCapacity,
      ca_selectedEquipments,
      ca_displayBookedRooms,
      ca_error,
      ca_isLoading,
      ca_reservations,
      ca_range,
      ca_masks,
      getSynthesis,
      getRangeSpan,
      createReservation
    };
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
