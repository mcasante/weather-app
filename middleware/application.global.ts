import { useLocationStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const locationStore = useLocationStore();

  const defaultPage = locationStore.list[0].slug;

  if (to.name === "index") {
    return navigateTo(defaultPage);
  }

  const paramLocation = to.params.location;
  const slugifiedParam = isString(paramLocation) && slugify(paramLocation);
  const found = locationStore.list.find(
    (location) => location.slug === slugifiedParam
  );

  if (!found) {
    return navigateTo(defaultPage);
  }
});
