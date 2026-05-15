import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "hi@mannydevelops.com";
export const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "Manuel Peña <no-reply@mannydevelops.com>";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
