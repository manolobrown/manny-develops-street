import { NextResponse } from "next/server";
import { z } from "zod";

const FORM_IDS: Record<string, string | undefined> = {
  newsletter: process.env.KIT_FORM_NEWSLETTER_ID,
  sticky: process.env.KIT_FORM_STICKY_ID,
  presets: process.env.KIT_FORM_PRESETS_ID,
  "pricing-guide": process.env.KIT_FORM_PRICING_GUIDE_ID,
};

const KitFormName = z.enum(["newsletter", "sticky", "presets", "pricing-guide"]);

const Body = z.object({
  email: z.string().trim().email().max(320),
  form: KitFormName.default("newsletter"),
  firstName: z.string().trim().max(120).optional(),
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

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const { email, form, firstName } = parsed.data;
  const formId = FORM_IDS[form];
  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey || !formId) {
    console.log("[newsletter] missing kit config — logging only", { email, form, hasKey: !!apiKey, hasFormId: !!formId });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const res = await fetch(`https://api.kit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: firstName,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[newsletter] kit subscribe failed", res.status, text);
      return NextResponse.json({ error: "subscribe_failed" }, { status: 502 });
    }

    const data = (await res.json()) as { subscription?: { state?: string } };
    const state = data.subscription?.state ?? "unknown";
    return NextResponse.json({ ok: true, state });
  } catch (err) {
    console.error("[newsletter] kit fetch threw", err);
    return NextResponse.json({ error: "subscribe_failed" }, { status: 502 });
  }
}
