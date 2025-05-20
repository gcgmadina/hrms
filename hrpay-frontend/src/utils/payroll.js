export function formatDate(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0]; // Format YYYY-MM-DD
}