<template>
  <div class="rooms-container">

    <!-- HEADERS -->
    <div class="list-headers">
      <p class="name">NOM</p>
      <p class="capacity">CAPACITÉ</p>
      <p class="description">DESCRIPTION</p>
      <p class="equipments">ÈQUIPEMENTS</p>
      <p class="reservation">RÉSERVATION</p>
    </div>

    <!-- LIST -->
    <div v-if="isLoading" class="loading">
      <h2>Chargement des salles disponibles ... ⏱️</h2>
    </div>
    <div v-else-if="error" class="error">
      <h2>🤷 {{ error }}</h2>
    </div>
    <div class="room"
      v-else
      v-for="(room, index) in rooms"
      v-bind:item="room"
      v-bind:index="index"
      v-bind:key="room._id"
    >
      <p class="name">{{ room.name }}</p>
      <p class="capacity">
        <font-awesome-icon :icon="['fa', room.capacity > 5 ? (room.capacity > 15 ? 'users' : 'user-friends') : 'user-alt']" />
        {{ room.capacity }}
      </p>
      <p class="description">{{ room.description }}</p>
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
        <button v-if="!room.booked" @click="createReservation(room._id)">
          <!-- <font-awesome-icon :icon="['fa', 'bookmark']" /> -->
          Réserver
        </button>
        <p v-if="!room.booked">pour {{ getRangeSpan }}</p>
        <p v-if="room.booked">{{ room.bookedInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { onBeforeMount } from 'vue';

export default {
  name: 'RoomsListComponent',
  props: ['rooms', 'getRangeSpan', 'isLoading', 'error'],
  emits: ['create-reservation'],
  setup(_, context) {
    // lifecycle
    // onBeforeMount(async () => {
    //   while (props.isLoading.value === false) {
    //     console.log("a");
    //     await null; // prevents app from hanging
    //   }
    // });
    // methods
    function createReservation(id) {
      context.emit("create-reservation", id);
    }
    return { createReservation };
  }
}
</script>

<style scoped>
/* list var */
* {
  --var-name-width: 0 0 15%;
  --var-capacity-width: 0 0 10%;
  --var-description-width: 0 0 15%;
  --var-equipments-width: 1;
  --var-reservation-width: 0 0 18%;
  --var-black: #000;
  --var-white: #fff;
  --var-grey: #a0a0a0;
  --var-lightgrey: #f1f1f1;
  --var-stationfpink: #ff00ae;
}
/* list headers */
.list-headers {
  display: flex;
  margin: 10px 0px 10px 0px;
  padding: 10px 0px 10px 0px;
  border-radius: 4px;
  font-weight: bold;
}
.list-headers > p {
  margin: 5px;
  padding: 5px 0px 5px 0px;
  border-radius: 4px;
  color: var(--var-black);
  background-color: var(--var-white);
  font-weight: bold;
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
  font-weight: bold;
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  color: var(--var-white);
}
.error > h2 {
  font-weight: bold;
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  color: var(--var-white);
}
.room {
  display: flex;
  margin: 0 10 10 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background: var(--var-white);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
}
.room:hover {
   background-color: var(--var-lightgrey);
}
.room > p {
  margin: 0 5px;
  line-height: 50px;
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
  padding: 0px;
}
.room > .equipments > li {
  margin: 0 10px;
}
.room > .reservation {
  flex: var(--var-reservation-width);
}
.room > .reservation > button {
  color: var(--var-stationfpink);
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  border: 1px solid var(--var-stationfpink);
  background: var(--var-white);
  font-weight: bold;
}
.room > .reservation > button:hover {
  color: var(--var-white);
  padding: 0.5rem 1.75rem 0.50rem 1.75rem;
  border: 1px solid var(--var-stationfpink);
  background: var(--var-stationfpink);
  font-weight: bold;
}
.room > .reservation > p {
  padding-top: 3px;
  margin: 0px;
  color: var(--var-grey);
}
</style>
