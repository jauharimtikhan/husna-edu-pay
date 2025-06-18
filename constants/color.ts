const colors = {
  white: "#FFFFFF",
  grey: "#E9E9E9",
  black: "#000000",
  blue: "#468CE7",
  pending: "#FFA500",
  success: "#4CAF50",
  danger: "#F44336",
};

const newColors = {
  100: "rgba(212, 238, 230, 1)",
  200: "rgba(169, 221, 204, 1)",
  300: "rgba(125, 204, 179, 1)",
  400: "rgba(82, 187, 153, 1)",
  500: "rgba(39, 170, 128, 1)",
  600: "rgba(31, 136, 102, 1)",
  700: "rgba(23, 102, 77, 1)",
  800: "rgba(16, 68, 51, 1)",
  900: "rgba(8, 34, 26, 1)",
};

export { colors, newColors };
export type Colors = typeof colors;
export type NewColors = typeof newColors;
