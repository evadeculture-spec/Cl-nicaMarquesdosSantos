import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: body.name.slice(0, 200),
      email: body.email.slice(0, 200),
      phone: body.phone?.slice(0, 40) ?? null,
      message: body.message.slice(0, 4000),
    });
    if (error) {
      console.error("contact insert failed", error.message);
      return NextResponse.json({ error: "insert_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ status: "received" }, { status: 201 });
}
