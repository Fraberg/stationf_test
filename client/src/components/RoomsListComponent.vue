<template>
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
    <div v-if="isLoading" class="loading">
      <h2>Chargement ... :)</h2>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div class="room"
      v-else
      v-for="(room, index) in rooms"
      v-bind:item="room"
      v-bind:index="index"
      v-bind:key="room._id"
    >
      <p class="name">{{ room.name }}</p>
      <p class="capacity">{{ room.capacity }}</p>
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
        <button v-if="!room.booked" @click="createReservation(index)">
          <font-awesome-icon :icon="['fa', 'bookmark']" />
          Réserver
        </button>
        <p v-if="!room.booked">pour {{ getRangeSpan }}</p>
        <p v-if="room.booked">{{ room.bookedInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomsListComponent',
  props: ["rooms", "getRangeSpan", "isLoading", "error"],
  emits: ["create-reservation"],
  setup(_, context) {
    function createReservation(index) {
      context.emit("create-reservation", index);
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
}
.room > .reservation > p {
  margin: 0px;
}
</style>
