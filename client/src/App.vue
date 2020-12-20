<template>
  <div>
    <!-- <TestComponent/> -->
    <RoomComponent/>
  </div>
</template>

<script>
import RoomComponent from './components/RoomComponent.vue';

export default {
  name: 'App',
  components: {
    RoomComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
