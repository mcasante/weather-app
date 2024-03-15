export const useUserStore = defineStore("user", () => {
  const userName = ref("user 🌞");

  return {
    userName,
  };
});
