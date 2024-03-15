import { defineStore } from "pinia";

export const useLocationStore = defineStore(
  "location",
  () => {
    const list = [
      "Denver 🏔",
      "Rio de Janeiro ⛱",
      "Madrid 💃",
      "Japan 🍣",
      "Australia 🐨",
    ].map((l) => createLocation(l, "name"));

    const selected = ref();

    const selectLocation = (location: string | ILocation) => {
      if (typeof location === "string") {
        const exists = list.find((l) => [l.slug, l.name].includes(location));
        selected.value = exists || list[0];
        return;
      }

      selected.value = location;
    };

    const addLocation = (location: string, type: "slug" | "name" = "slug") => {
      list.push(createLocation(location, type));
    };

    const deleteLocation = (locationSlug: string) => {
      const index = list.findIndex((l) => l.slug === locationSlug);
      list.splice(index, 1);
    };

    return {
      selected,
      list,
      selectLocation,
      addLocation,
      deleteLocation,
    };
  },
  { persist: true }
);
