<template>
<div>
  Search for <input v-model="searchInput" /> 
    <div>
      <p>Loading: {{ getRooms.loading.value }}</p>
      <p>Error: {{ getRooms.error.value }}</p>
      <p>Number of elements: {{ getRooms.results.value?.length }}</p>
  </div>
</div>
</template>

<script>
import { ref, watch, /* watchEffect */} from "vue";
import RoomService from '@/service/RoomService';
import { onBeforeMount, onMounted } from 'vue';
import usePromise from "@/use/promise";
// import useRoomTest from "@/use/roomTest";

export default {
  setup() {
    const searchInput = ref("");
    const getRooms = usePromise(async () => 
      await RoomService.getRooms()
    );
    onBeforeMount(async () => {
      console.log("Before mount");
    });
    onMounted(() => {
      console.log("Mounted");
    });
    watch(searchInput, async () => {
        getRooms.createPromise(searchInput);
    }, { immediate: false });
    return { searchInput, getRooms };
  }
}
</script>

<style scoped>
</style>
