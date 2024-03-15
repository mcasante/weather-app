export interface ILocation {
  name: string;
  slug: string;
}

export const createLocation = (
  location: string,
  from: "slug" | "name" = "name"
): ILocation => {
  const isSlug = from === "slug";

  return {
    name: isSlug ? unslugify(location) : location,
    slug: isSlug ? location : slugify(location),
  };
};
