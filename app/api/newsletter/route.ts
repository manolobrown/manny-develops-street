import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, CONTACT_TO, CONTACT_FROM, escapeHtml } from "@/lib/email";

const NewsletterSchema = z.object({
  email: z.string().trim().email().max(320),
});

export async function POST(request: Request) {
  const ct = request.headers.get("content-type") ?? "";
  let payload: Record<string, FormDataEntryValue>;

  if (ct.includes("application/json")) {
    payload = (await request.json()) as Record<string, FormDataEntryValue>;
  } else {
    const form = await request.formData();
    payload = Object.fromEntries(form.entries());
  }

  const parsed = NewsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const { email } = parsed.data;

  // No Resend Audience wired up yet — relay as a plain notification so the
  // photographer gets the address and can add it manually until the audience
  // integration ships.
  if (!resend) {
    console.log("[newsletter] (no resend key — logging only)", { email });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: "[Site] Newsletter signup",
      html: `<p>New Sunday-letter signup: <strong>${escapeHtml(email)}</strong></p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] resend send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
