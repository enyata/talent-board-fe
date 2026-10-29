const ordinal = (n: number) => {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  return `${n}${{ 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th"}`;
};

const hour12 = (date: Date) => {
  const h = date.getHours();
  return { hour: h % 12 || 12, meridiem: h < 12 ? "am" : "pm" };
};

/** "6th Jul, 2026 . 7 pm" — used in the users table. */
export function formatTableDate(iso: string) {
  const date = new Date(iso);
  const month = date.toLocaleString("en-US", { month: "short" });
  const { hour, meridiem } = hour12(date);
  return `${ordinal(date.getDate())} ${month}, ${date.getFullYear()} . ${hour} ${meridiem}`;
}

/** "July 31, 2024 at 4:00 pm" — used on the user profile. */
export function formatLongDate(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const { hour, meridiem } = hour12(date);
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} at ${hour}:${minutes} ${meridiem}`;
}

/** Strip the protocol so "https://linkedin.com/in/x" displays as "linkedin.com/in/x". */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

/** "22 Apr 2023, 12:43 PM" — used in the activity log. */
export function formatActivityDate(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return `${day}, ${time}`;
}
