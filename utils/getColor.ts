export default (temperature: number) => {
  if (temperature < 8) return "bg-w-blue-200";
  if (temperature < 15) return "bg-w-green";
  if (temperature < 24) return "bg-w-yellow";
  return "bg-w-red";
};
