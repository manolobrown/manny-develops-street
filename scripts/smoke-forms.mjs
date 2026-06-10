#!/usr/bin/env node
// Smoke-test every form endpoint on the local dev server (or a remote host
// via SMOKE_HOST=https://...). Two modes:
//
//   node scripts/smoke-forms.mjs          # schema-only — no real emails, no Kit subscribers
//   node scripts/smoke-forms.mjs --live   # also runs happy-path tests
//
// Live mode side effects (one per form, five total):
//   - One real email lands in CONTACT_TO_EMAIL via Resend
//   - One Kit subscriber per form (newsletter, sticky, presets, pricing-guide),
//     each marked smoke+<form>@example.com so they're filterable + bulk-deletable
//
// The script exits non-zero if any test fails, so it's CI-friendly.

const HOST = process.env.SMOKE_HOST ?? "http://localhost:3000";
const LIVE = process.argv.includes("--live");

let pass = 0;
let fail = 0;

async function check(label, fn) {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
    pass++;
  } catch (err) {
    console.log(`  ✗ ${label}`);
    console.log(`    ${err.message}`);
    fail++;
  }
}

async function post(pathname, body) {
  const res = await fetch(`${HOST}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    // Non-JSON response is fine; just leave json null.
  }
  return { status: res.status, json };
}

function expectStatus(actual, expected) {
  if (actual !== expected) {
    throw new Error(`expected status ${expected}, got ${actual}`);
  }
}

console.log(`smoke-forms · host: ${HOST} · live: ${LIVE ? "yes" : "no"}\n`);

console.log("/api/contact — schema validation");
await check("rejects empty name", async () => {
  const { status, json } = await post("/api/contact", {
    name: "",
    email: "test@example.com",
    message: "hi",
  });
  expectStatus(status, 400);
  if (!json?.issues?.fieldErrors?.name) {
    throw new Error(`expected fieldErrors.name in issues, got ${JSON.stringify(json)}`);
  }
});
await check("rejects invalid email format", async () => {
  const { status, json } = await post("/api/contact", {
    name: "Test",
    email: "not-an-email",
    message: "hi",
  });
  expectStatus(status, 400);
  if (!json?.issues?.fieldErrors?.email) {
    throw new Error(`expected fieldErrors.email in issues, got ${JSON.stringify(json)}`);
  }
});
await check("rejects empty message", async () => {
  const { status, json } = await post("/api/contact", {
    name: "Test",
    email: "test@example.com",
    message: "",
  });
  expectStatus(status, 400);
  if (!json?.issues?.fieldErrors?.message) {
    throw new Error(`expected fieldErrors.message in issues, got ${JSON.stringify(json)}`);
  }
});

console.log("\n/api/newsletter — schema validation");
for (const form of ["newsletter", "sticky", "presets", "pricing-guide"]) {
  await check(`${form}: rejects missing email`, async () => {
    const { status, json } = await post("/api/newsletter", { form });
    expectStatus(status, 400);
    if (json?.error !== "invalid_input") {
      throw new Error(`expected error: "invalid_input", got ${JSON.stringify(json)}`);
    }
  });
}
await check("rejects invalid email format", async () => {
  const { status, json } = await post("/api/newsletter", {
    email: "not-an-email",
    form: "newsletter",
  });
  expectStatus(status, 400);
  if (json?.error !== "invalid_input") {
    throw new Error(`expected error: "invalid_input", got ${JSON.stringify(json)}`);
  }
});
await check("rejects unknown form value", async () => {
  const { status, json } = await post("/api/newsletter", {
    email: "test@example.com",
    form: "nope",
  });
  expectStatus(status, 400);
  if (json?.error !== "invalid_input") {
    throw new Error(`expected error: "invalid_input", got ${JSON.stringify(json)}`);
  }
});

if (LIVE) {
  console.log("\n/api/contact — happy path (sends a real email)");
  await check("accepts valid payload", async () => {
    const { status, json } = await post("/api/contact", {
      intent: "other",
      name: "Smoke Test",
      email: "smoke-test@example.com",
      message: "Automated smoke test from scripts/smoke-forms.mjs --live. Safe to delete.",
    });
    expectStatus(status, 200);
    if (!json?.ok) {
      throw new Error(`expected {ok: true}, got ${JSON.stringify(json)}`);
    }
  });

  console.log("\n/api/newsletter — happy path (creates real Kit subscribers)");
  for (const form of ["newsletter", "sticky", "presets", "pricing-guide"]) {
    await check(`${form}: accepts valid payload`, async () => {
      const { status, json } = await post("/api/newsletter", {
        email: `smoke+${form}@example.com`,
        form,
      });
      expectStatus(status, 200);
      if (!json?.ok) {
        throw new Error(`expected {ok: true}, got ${JSON.stringify(json)}`);
      }
    });
  }
}

console.log(`\n${pass} passed · ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
