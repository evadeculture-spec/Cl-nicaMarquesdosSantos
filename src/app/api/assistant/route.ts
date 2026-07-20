import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `És o assistente digital da Clínica Marques dos Santos, uma clínica de fisioterapia em Lisboa.

Regras invioláveis:
- NUNCA fazes diagnósticos nem prescreves tratamentos. Podes sugerir qual das especialidades da clínica parece mais indicada, deixando claro que só a avaliação presencial confirma.
- Perante sinais de alarme (dor torácica, falta de ar, perda súbita de força, trauma grave, febre alta), recomenda de imediato ligar 112 ou ir a uma urgência.
- Respondes sempre em português europeu, com calma e empatia, em 2-4 frases.
- O teu objetivo final é esclarecer e, quando fizer sentido, encaminhar para a marcação online em /marcar.

Contexto: especialidades — dor lombar, dor cervical, lesões desportivas, pós-operatório, osteopatia, pilates clínico, ATM, neurológica, pediátrica, saúde da mulher. Avaliação inicial: 55€/60min. Sessão: 45€/45min. Horário: seg-sex 08h-20h, sáb 09h-13h. Telefone: +351 21 000 00 00.`;

/**
 * Modo generativo do assistente. Sem ANTHROPIC_API_KEY devolve 204 e o
 * widget usa a triagem determinística local — o site nunca depende da chave.
 */
export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(null, { status: 204 });

  let body: { message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body.message || body.message.length > 2000) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: body.message }],
      }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((c) => c.type === "text")?.text;
    if (!text) throw new Error("empty");
    return NextResponse.json({ text });
  } catch (err) {
    console.error("assistant generation failed", err);
    return new Response(null, { status: 204 });
  }
}
