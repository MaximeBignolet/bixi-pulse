export type AvailabilityLevel = "good" | "low" | "none";

export function getAvailabilityLevel(bikesAvailable: number): AvailabilityLevel {
  if (bikesAvailable === 0) {
    return "none";
  }
  return bikesAvailable < 5 ? "low" : "good";
}

// Hex values needed by Leaflet pathOptions; keep in sync with the classes below.
export const AVAILABILITY_COLORS: Record<AvailabilityLevel, string> = {
  good: "#10b981",
  low: "#f59e0b",
  none: "#ef4444",
};

export const AVAILABILITY_DOT_CLASSES: Record<AvailabilityLevel, string> = {
  good: "bg-emerald-500",
  low: "bg-amber-500",
  none: "bg-red-500",
};
