export function formatAssistantDateTime(value: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(value));
}

export function formatAssistantTimeRange(
  from: string,
  to: string,
  timeZone: string,
) {
  return `${formatAssistantDateTime(from, timeZone)} – ${formatAssistantDateTime(to, timeZone)}`;
}
