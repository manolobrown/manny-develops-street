import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, CONTACT_TO, CONTACT_FROM, escapeHtml } from "@/lib/email";

const ContactSchema = z.object({
  intent: z.enum(["portrait", "workshop", "editorial", "other"]).optional(),
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  when: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  let payload: Record<string, FormDataEntryValue>;
  const ct = request.headers.get("content-type") ?? "";

  if (ct.includes("application/json")) {
    payload = (await request.json()) as Record<string, FormDataEntryValue>;
  } else {
    const form = await request.formData();
    payload = Object.fromEntries(form.entries());
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const subject = `[Site] ${data.intent ? `${data.intent} inquiry` : "Inquiry"} — ${data.name}`;
  const html = `
    <h2>New inquiry — ${escapeHtml(data.intent ?? "general")}</h2>
    <p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
    ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
    ${data.when ? `<p><strong>Timing:</strong> ${escapeHtml(data.when)}</p>` : ""}
    <hr />
    <p style="white-space: pre-wrap">${escapeHtml(data.message)}</p>
  `;

  if (!resend) {
    // No RESEND_API_KEY configured — log instead so dev still works.
    console.log("[contact] (no resend key — logging only)", { subject, data });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: data.email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
