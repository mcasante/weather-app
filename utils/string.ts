export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-$/, "");
};

// from slug to name
export const unslugify = (text: string) => {
  return text
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const isString = (value: any): value is string => {
  return typeof value === "string";
};
