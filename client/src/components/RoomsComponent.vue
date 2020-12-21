<template>
  <div class="container">
    <h1 class="title">🏬 Réserver une salle 🏬</h1>
    <!-- FORM -->
    <div class="form-border">
      <!-- <div class="wrapper"> -->
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
                color="pink"
              >
                <template v-slot="{ inputValue, inputEvents, isDragging }">
                  <div class="datepicker-subtemplate flex flex-col sm:flex-row justify-start items-center">
                    <!-- start datetime -->
                    <div class="date-picker-input-wrapper relative flex-grow">
                      <p class="label input">Début</p>
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
                      <p class="label input">Fin</p>
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
                <p class="label capacity">Capacité</p>
                <input v-model="selectedCapacity" type="number" step="1" min="1" required="true"/>
              </div>
              <!-- equipments -->
              <div class="equipments">
                <p class="label equipments">Équipements</p>
                <input v-model="selectedEquipments" placeholder="TV, Retro ..."/>
              </div>
              <!-- afficher les salles réservées -->
              <div class="display-if-booked">
                <p class="label display-if-booked">Afficher les salles réservées</p>
                <input type="checkbox" v-model="displayBookedRooms">
              </div>
            </div>
          </form>

        </div>
        <div class="synthesis-container">
          <!-- FORM SYNTHESIS -->
          <p class="synthesis">
            <font-awesome-icon :icon="['fa', 'search']" />
            {{ getSynthesis }}
          </p>
        </div>
      <!-- </div> -->
    </div>

    <!-- <Suspense>
      <template #default> -->
        <!-- ROOMS -->
        <RoomsListComponent
          :rooms="filteredRooms"
          @create-reservation="createReservation"
          :getRangeSpan="getRangeSpan"
          :isLoading="isLoading"
          :error="error"
        >
        </RoomsListComponent>
      <!-- </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense> -->

    <!-- CLEAR -->
    <div class="delete-reservations">
      <button
        @click="deleteReservations"
        v-show="reservations.length"
      >
        Supprimer les réservations
        <font-awesome-icon :icon="['fa', 'trash-alt']" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { onBeforeMount } from 'vue';
const Swal = require('sweetalert2');

import RoomService from '../service/RoomService';
import ReservationService from '../service/ReservationService';
import RoomsListComponent from '@/components/RoomsListComponent.vue';
import utils from "../utils/utils";

export default {
  name: 'RoomComponent',
  components: {
    RoomsListComponent
  },
  setup() {
    // init refs
    const rooms = ref([]);
    const selectedCapacity = ref(2);
    const selectedEquipments = ref('');
    const displayBookedRooms = ref(false);
    const error = ref('');
    const isLoading = ref(true);
    const reservations = ref([]);
    const range = ref({
      start: utils.roundDate(new Date(Date.now()), 5),
      end: utils.roundDate(new Date(Date.now() + (30 * 60 * 1000)), 5)
    });
    const masks = { input: 'YYYY-MM-DD h:mm A' };

    // lifecycle
    onBeforeMount(async () => {
      try {
        rooms.value = await RoomService.getRooms();
        reservations.value = await ReservationService.getReservations(range.value);
        filterRooms();
      } catch(err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    });
    
    // computed
    const getSelectedEquipments = computed(function() {
      return selectedEquipments.value.trim().toLowerCase();
    });
    const getSynthesis = computed(function() {
      if (getRangeSpan.value === 'unvalid') {
        const errorMsg = 'La durée de la réservation doit être >= à 5 minutes';
        return errorMsg;
      }
      let synthesis = `< ${utils.formatLiteralDate(range.value.start)} - ${utils.formatLiteralDate(range.value.end)} (${getRangeSpan.value}) | ${selectedCapacity.value} place${selectedCapacity.value > 1 ? 's' : ''}`;
      synthesis += (getSelectedEquipments.value !== '') ? ` | équipée de : "${selectedEquipments.value}" >` : ' >';
      return synthesis;
    });
    const getRangeSpan = computed(function() {
      return utils.getDuration(range.value.start, range.value.end);
    });
    const filteredRooms = computed(function() {
      return rooms.value.filter(function (room) {
        return (room.capacity >= selectedCapacity.value 
          && (!room.booked || displayBookedRooms.value)
          && (!selectedEquipments.value.length || room.includesSelectedEquipments))
      }).sort(function(a, b) { return a.distance - b.distance; });
    });

    // watch functions
    watch(range, async () => {
      if (getRangeSpan.value === 'unvalid') {
        error.value = getSynthesis.value;
        Swal.fire('Oops...', getSynthesis.value, 'error');
        return;
      }
      error.value = '';
      try {
        reservations.value = await ReservationService.getReservations(range.value);
      } catch (err) {
        Swal.fire('Oops...', err, 'error');
        error.value = err;
      }
      filterRooms();
    }, { immediate: false });
    watch(getSelectedEquipments, () => {
      if (getSelectedEquipments.value.length) {
        filterRooms();
      }
    }, { immediate: false });
    
    // methods
    function checkIfRoomIncludesSelectedEquipments(room) {
      if (getSelectedEquipments.value.length) {
        room.includesSelectedEquipments = false;
        getSelectedEquipments.value.split(' ').forEach(selectedEquipement => {
          room.equipments.forEach(equipement => {
            if (equipement.name.toLowerCase().includes(selectedEquipement)) {
              room.includesSelectedEquipments = true;
              return;
            }
          });
        });
      }
    }
    function checkIfRoomIsBooked(room) {
      reservations.value.forEach(reservation => {
        if (reservation.room_id === room._id) {
          if (reservation.start >= range.value.start && reservation.start < range.value.end
          || reservation.end > range.value.start && reservation.end <= range.value.end) {
            room.booked = true;
            room.bookedInfo = `Réservée du ${utils.formatNumericDate(reservation.start)} au ${utils.formatNumericDate(reservation.end)}`;
            return;
          } 
        }
      });
    }
    function filterRooms() {
      rooms.value = rooms.value.map(function(room) {
          let roomCopy = Object.assign({}, room);
          roomCopy.booked = false;
          roomCopy.includesSelectedEquipments = true;
          return roomCopy;
      });
      rooms.value.forEach(room => {
        checkIfRoomIsBooked(room);
        checkIfRoomIncludesSelectedEquipments(room);
      });
    }
    async function createReservation(index) {
      const room = rooms.value[index];
      if (!room) {
        Swal.fire('Oops...', 'Erreur lors de l\'enregistrement de cette réservation', 'error');
        return;
      }
      try {
        // isLoading.value = true;
        room.booked = true;
        // room.bookedInfo = `Réservée du ${utils.formatNumericDate(range.value.start)} au ${utils.formatNumericDate(range.value.end)}`;
        Swal.fire({
          title: 'Réservation enregistrée',
          html: `Du <b>${utils.formatLiteralDate(range.value.start)}</b><br>au <b>${utils.formatLiteralDate(range.value.end)}</b><br>Durée de <b>${getRangeSpan.value}</b><br>Capacité : ${room.capacity} places au total`,
          icon: 'success'
        })
        /* const insertedReservation =*/ await ReservationService.insertReservation(room, range.value, selectedCapacity.value);
        // reservations.value.push(insertedReservation);
        reservations.value = await ReservationService.getReservations(range.value);
        filterRooms();
      } catch (err) {
        Swal.fire('Oops...', `Erreur lors de l'enregistrement de cette réservation ${err}`, 'error');
        error.value = err;
      } /* finally {
        isLoading.value = false;
      } */
    }
    async function deleteReservations() {
        try {
          const ids = reservations.value.map(reservation => reservation._id);
          Swal.fire('Réservations supprimées', 'Pour la période sélectionnée', 'success');
          reservations.value = [];
          filterRooms();
          // isLoading.value = true;
          for (const id of ids) {
            await ReservationService.deleteReservation(id);
          }
        } catch (err) {
          Swal.fire('Oops...', `Erreur lors de la suppression de cette réservation ${err}`, 'error');
          error.value = err;
        } /* finally {
          isLoading.value = false;
        } */
    }

    // end setup => return
    return {
      rooms,
      selectedCapacity,
      selectedEquipments,
      displayBookedRooms,
      error,
      isLoading,
      reservations,
      range,
      masks,
      getSynthesis,
      getRangeSpan,
      filteredRooms,
      createReservation,
      deleteReservations
    };
  }
}
</script>

<style scoped>
/* --- general */
* {
  --var-black: #000;
  --var-white: #fff;
  --var-grey: #a0a0a0;
  --var-lightgrey: #f1f1f1;
  --var-stationfpink: #ff00ae;
}
.container {
  display: flex;
  flex-direction: column;
}
.title {
  color: var(--var-white);
  margin: 0px 0px 10px 0px;
}
/* form */
.form-border {
  background-image: linear-gradient(135deg, #fff000 25%, #ff00ae 25%, #ff00ae 50%, #fff000 50%, #fff000 75%, #ff00ae 75%, #ff00ae 100%);
  background-size: 28.28px 28.28px;
  padding: 8px;
}
.form-container {
  display: flex;
  justify-content: space-around;
  background-color: var(--var-black);
  color: var(--var-white);
  margin: 0px;
}
form {
  margin-bottom: 10px;
}
input {
  padding: 4px;
}
p.label {
  margin: 10px 0px 10px 0px;
  font-size: 13px;
  font-weight: bold;
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
  /* border-color: var(--var-color-3); */
}
.capacity {
  padding: 0 10px;
  width: 120px;
}
.capacity > input {
  width: 100%;
  text-align: center;
}
.equipments {
  padding: 0 10px;
  width: 120px;
}
.equipments > input {
  width: 100%;
  text-align: center;
}
.display-if-booked {
  padding: 0 10px;
  width: 170px;
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
.synthesis-container {
  background-color: var(--var-black);
  color: var(--var-white);
  margin: 0px;
}
.synthesis {
  padding: 10px;
  margin: 0px;
}
.delete-reservations {
  margin-top: 50px;
}
.delete-reservations > button {
  color: var(--var-stationfpink);
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  border: 1px solid var(--var-stationfpink);
  background: var(--var-white);
  font-weight: bold;
}
.delete-reservations > button:hover {
  color: var(--var-white);
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  border: 1px solid var(--var-stationfpink);
  background: var(--var-stationfpink);
  font-weight: bold;
}
</style>
