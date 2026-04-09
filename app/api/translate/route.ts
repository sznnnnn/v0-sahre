import { NextResponse } from "next/server";

type TranslateTarget = "en" | "zh-CN";

function parseTranslatedText(payload: unknown): string {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) return "";
  const rows = payload[0] as unknown[];
  const parts: string[] = [];
  for (const row of rows) {
    if (Array.isArray(row) && typeof row[0] === "string") {
      parts.push(row[0]);
    }
  }
  return parts.join("");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { text?: string; target?: TranslateTarget };
    const text = body.text?.trim();
    const target = body.target;

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }
    if (target !== "en" && target !== "zh-CN") {
      return NextResponse.json({ error: "target must be en or zh-CN" }, { status: 400 });
    }

    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto` +
      `&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) {
      return NextResponse.json({ error: "translation service unavailable" }, { status: 502 });
    }
    const payload = (await r.json()) as unknown;
    const translatedText = parseTranslatedText(payload);
    if (!translatedText) {
      return NextResponse.json({ error: "translation parse failed" }, { status: 502 });
    }

    return NextResponse.json({ translatedText });
  } catch {
    return NextResponse.json({ error: "translation failed" }, { status: 500 });
  }
}
