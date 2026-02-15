import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/* ── Rate limiter (in-memory, per cold-start) ────────────────────────── */
const hits = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + 86_400_000 });
    return false;
  }
  entry.count++;
  return entry.count > LIMIT;
}

/* ── Anthropic client ────────────────────────────────────────────────── */
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/* ── Handler ─────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've reached the daily limit (10 strategies). Come back tomorrow!" },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.companyName?.trim()) {
    return NextResponse.json(
      { error: "Company name is required." },
      { status: 400 },
    );
  }

  const { companyName, industry, businessBackground } = body;

  const systemPrompt = `You are a world-class business strategist trained in Alex Brueckmann's "Strategy on a Page" framework. Given basic business context, you generate a complete one-page strategy.

Return ONLY valid JSON (no markdown fences, no commentary) matching this exact structure:
{
  "visionClients": "A compelling 2-3 sentence vision of the future state for the company's clients/customers",
  "visionPeople": "A compelling 2-3 sentence vision of the future state for the company's employees and team",
  "visionStakeholders": "A compelling 2-3 sentence vision for shareholders, partners, and community stakeholders",
  "pillars": [
    {
      "id": "pillar-1",
      "name": "Short Strategic Pillar Name",
      "description": "1-2 sentence description of what this pillar means strategically",
      "initiatives": [
        "Specific initiative 1 under this pillar",
        "Specific initiative 2 under this pillar",
        "Specific initiative 3 under this pillar"
      ],
      "stories": {
        "communication": "How we communicate this pillar internally and externally (2-3 sentences)",
        "connection": "How this pillar connects to our daily work and culture (2-3 sentences)",
        "consistency": "How we maintain consistency in executing this pillar over time (2-3 sentences)"
      }
    },
    {
      "id": "pillar-2",
      "name": "Short Strategic Pillar Name",
      "description": "1-2 sentence description",
      "initiatives": [
        "Specific initiative 1",
        "Specific initiative 2",
        "Specific initiative 3"
      ],
      "stories": {
        "communication": "How we communicate this pillar (2-3 sentences)",
        "connection": "How this connects to daily work (2-3 sentences)",
        "consistency": "How we maintain consistency (2-3 sentences)"
      }
    },
    {
      "id": "pillar-3",
      "name": "Short Strategic Pillar Name",
      "description": "1-2 sentence description",
      "initiatives": [
        "Specific initiative 1",
        "Specific initiative 2",
        "Specific initiative 3"
      ],
      "stories": {
        "communication": "How we communicate this pillar (2-3 sentences)",
        "connection": "How this connects to daily work (2-3 sentences)",
        "consistency": "How we maintain consistency (2-3 sentences)"
      }
    }
  ]
}

RULES:
- Generate exactly 3 strategic pillars (they must reinforce each other)
- Pillars should be durable priorities, not short-term projects
- Initiatives should be high-level, not detailed project plans
- Stories use the 3Cs framework: Communication, Connection, Consistency
- Be specific to their industry and context — no generic advice
- Be bold and opinionated like a senior strategist
- Every element must feel tailored to THIS business`;

  const userPrompt = `Company: ${companyName}
Industry: ${industry || "Not specified"}
Background: ${businessBackground || "Not provided"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 3000,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt },
      ],
    });

    const raw = message.content[0]?.type === "text" ? message.content[0].text : "";
    const cleaned = raw
      .replace(/^```(?:json)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();
    const strategy = JSON.parse(cleaned);

    return NextResponse.json(strategy);
  } catch (err: unknown) {
    console.error("Strategy generation failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Strategy generation failed. Please try again. (${message})` },
      { status: 500 },
    );
  }
}
