import { defineStore } from "pinia";

export const useLocationStore = defineStore(
  "location",
  () => {
    const list = ref(
      [
        "Denver 🏔",
        "Rio de Janeiro ⛱",
        "Madrid 💃",
        "Japan 🍣",
        "Australia 🐨",
      ].map((l) => createLocation(l, "name"))
    );

    const addLocation = (location: string, type: "slug" | "name" = "slug") => {
      list.value.push(createLocation(location, type));
    };

    const deleteLocation = (locationSlug: string) => {
      const index = list.value.findIndex((l) => l.slug === locationSlug);
      list.value.splice(index, 1);
    };

    const getLocation = (locationSlug: string) => {
      return list.value.find((l) => l.slug === locationSlug);
    };

    return {
      list,
      getLocation,
      addLocation,
      deleteLocation,
    };
  },
  { persist: true }
);
