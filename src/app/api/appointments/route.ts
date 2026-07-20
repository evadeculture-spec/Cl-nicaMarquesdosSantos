import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Payload = {
  treatmentId?: string;
  professionalId?: string;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const required = ["treatmentId", "professionalId", "date", "time", "name", "email", "phone"] as const;
  for (const key of required) {
    if (!body[key] || typeof body[key] !== "string") {
      return NextResponse.json({ error: `missing_${key}` }, { status: 400 });
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date!) || !/^\d{2}:\d{2}$/.test(body.time!)) {
    return NextResponse.json({ error: "invalid_datetime" }, { status: 400 });
  }

  const supabase = await createClient();

  // Modo demo: sem Supabase configurado, a marcação é aceite e simulada.
  if (!supabase) {
    return NextResponse.json({ status: "pending", demo: true }, { status: 201 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      treatment_id: body.treatmentId,
      professional_id: body.professionalId,
      scheduled_date: body.date,
      scheduled_time: body.time,
      patient_name: body.name!.slice(0, 200),
      patient_email: body.email!.slice(0, 200),
      patient_phone: body.phone!.slice(0, 40),
      notes: body.notes?.slice(0, 2000) ?? null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("appointments insert failed", error.message);
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  // A Edge Function booking-confirmation (Resend + Google Calendar) é
  // disparada por database webhook no insert — nada a fazer aqui.
  return NextResponse.json({ status: "pending", id: data.id }, { status: 201 });
}
