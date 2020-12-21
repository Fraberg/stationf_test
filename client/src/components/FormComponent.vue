<template>
  <!-- FILTERS -->
  <!-- <div class="container"> -->
    <!-- FORM -->
    <!-- FORM SYNTHESIS -->
    <p class="filters-synthesis">{{ getSynthesis }}</p>
  <!-- </div> -->
</template>

<script>
// import RoomService from '../service/RoomService';
// import ReservationService from '../service/ReservationService';
// import { onBeforeMount } from 'vue';

// import utils from "../utils/utils";
// import { ref, computed, watch } from 'vue';

export default {
  name: 'SearchRoomsComponent',
    setup(_, context) {

    }
}
</script>

<style scoped>
* {
  --var-color-1: #F44336;
  --var-color-2: #ededed;
}

hr {
  width: 100%;
}

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
</style>
