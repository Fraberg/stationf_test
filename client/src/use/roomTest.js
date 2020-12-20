import { ref, computed } from "vue";

export default function useRoomTest() {
    const a = ref(1);
    const b = ref(2);
    const c = computed(() => {
      return a.value + b.value;
    });
    function increaseA() { a.value++; }
    return { a, b, c, increaseA };
}
