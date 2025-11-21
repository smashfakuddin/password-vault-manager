export function dateExtractor() {
  let current;
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) {
    current = "Morning";
  } else if (hour >= 12 && hour <= 15) {
    current = "Noon";
  } else if (hour >= 16 && hour <= 19) {
    current = "Afternoon";
  } else {
    current = "Night";
  }
  return current;
}
