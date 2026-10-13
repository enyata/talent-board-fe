import { showError, showSuccess } from "@/lib/Alerts";

export async function copyEmail(email: string) {
  try {
    await navigator.clipboard.writeText(email);
    showSuccess("Email copied to clipboard");
  } catch {
    showError("Couldn't copy email");
  }
}
