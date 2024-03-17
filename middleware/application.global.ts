import { useLocationStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const locationStore = useLocationStore();

  const defaultPage = locationStore.list[0].slug;

  if (to.name === "index") {
    return navigateTo(defaultPage);
  }

  const paramLocation = to.params.location;
  const slugifiedParam = isString(paramLocation) && slugify(paramLocation);

  const found = computed(() =>
    ["all", ...locationStore.list.map((location) => location.slug)].includes(
      slugifiedParam || ""
    )
  );

  if (!found.value) {
    return navigateTo(defaultPage);
  }
});
