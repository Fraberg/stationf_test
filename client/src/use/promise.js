import { ref } from "vue";
export default function usePromise(fn) { // fn is the actual API call
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const createPromise = async () => { // Args is where we send in searchInput
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(); // Passing through the SearchInput
      console.log("try | results.value:", results.value);
    } catch (err) {
      error.value = err;
      console.log("err | err:", err);
    } finally {
      console.log("finally | results.value:", results.value);
      loading.value = false;
    }
  };
  return { results, loading, error, createPromise };
}