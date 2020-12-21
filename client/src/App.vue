<template>
  <RoomsComponent/>
</template>

<script>
import RoomsComponent from './components/RoomsComponent.vue';

export default {
  name: 'App',
  components: {
    RoomsComponent
  }
}
</script>

<style>
body {
  background-image: url(https://www.sharedspace.co.nz/images/stories/station-f-zone-create-_-credits-patrick-tourneboeuf_preview.jpg);
}
#app {
  /* font-family: "FabrikatMedium", sans-serif; */
  font-family: Avenir, Helvetica, Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
.swal2-title {
    font-family: Avenir, Helvetica, Arial,sans-serif !important;
}
.swal2-html-container {
    font-family: Avenir, Helvetica, Arial,sans-serif !important;
}
.swal2-confirm {
    font-family: Avenir, Helvetica, Arial,sans-serif !important;
    background-color: #ff00ae !important;
    border-left-color: #ff00ae !important;
    border-right-color: #ff00ae !important;
}
</style>
