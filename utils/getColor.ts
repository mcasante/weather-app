const colors = {
  blue: {
    bg: "bg-w-blue-200",
    text: "text-w-blue",
    border: "border-w-blue-200",
    hex: "#C3E0FB",
  },
  green: {
    bg: "bg-w-green",
    text: "text-w-green",
    border: "border-w-green",
    hex: "#CDF0EB",
  },
  yellow: {
    bg: "bg-w-yellow",
    text: "text-w-yellow",
    border: "border-w-yellow",
    hex: "#FFF4DA",
  },
  red: {
    bg: "bg-w-red",
    text: "text-w-red",
    border: "border-w-red",
    hex: "#FFD1D1",
  },
};

export const getColor = (temperature: number) => {
  switch (true) {
    case temperature < 8:
      return colors.blue;
    case temperature < 15:
      return colors.green;
    case temperature < 24:
      return colors.yellow;
    default:
      return colors.red;
  }
};

export const getAllColors = () => {
  return colors;
};
