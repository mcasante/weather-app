import { useLocationStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const locationStore = useLocationStore();

  const defaultPage = locationStore.list[0].slug;

  if (to.name === "index") {
    return navigateTo(defaultPage);
  }

  const paramLocation = to.params.location;
  const slugifiedParam = isString(paramLocation) && slugify(paramLocation);

  const routes = [
    "all",
    ...locationStore.list.map((location) => location.slug),
  ];

  const found = routes.find((location) => location === slugifiedParam);

  if (!found) {
    return navigateTo(defaultPage);
  }
});
