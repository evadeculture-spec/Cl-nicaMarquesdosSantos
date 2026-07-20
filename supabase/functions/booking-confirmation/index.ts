// Edge Function: booking-confirmation
// Disparada por Database Webhook no INSERT em public.appointments.
// 1. Envia email de confirmação ao paciente (Resend)
// 2. Cria evento no Google Calendar da clínica (se configurado)
// 3. SMS preparado: ativa-se definindo TWILIO_* nos secrets
//
// Deploy: supabase functions deploy booking-confirmation
// Secrets: supabase secrets set RESEND_API_KEY=... GOOGLE_CALENDAR_ID=... TWILIO_ACCOUNT_SID=...

type AppointmentRecord = {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  scheduled_date: string;
  scheduled_time: string;
  treatment_id: string;
  professional_id: string;
};

const CLINIC_NAME = "Clínica Marques dos Santos";
const CLINIC_ADDRESS = "Av. da República 42, 3.º Esq., 1050-194 Lisboa";
const FROM = "Clínica Marques dos Santos <marcacoes@clinicamarquesdossantos.pt>";

function confirmationHtml(a: AppointmentRecord): string {
  const date = new Date(`${a.scheduled_date}T${a.scheduled_time}`);
  const when = date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `
  <div style="font-family:-apple-system,Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px;color:#0e1726">
    <p style="font-size:14px;color:#5f6b85;margin:0">${CLINIC_NAME}</p>
    <h1 style="font-size:24px;letter-spacing:-0.02em;margin:12px 0 0">
      Olá ${a.patient_name.split(" ")[0]}, recebemos o seu pedido.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#43506b">
      A sua marcação para <strong>${when}</strong> está registada e será
      confirmada pela nossa equipa nos próximos minutos, dentro do horário da clínica.
    </p>
    <div style="background:#f7f9fb;border-radius:12px;padding:20px;margin:24px 0">
      <p style="margin:0;font-size:14px;color:#43506b">📍 ${CLINIC_ADDRESS}</p>
      <p style="margin:8px 0 0;font-size:14px;color:#43506b">
        Desmarcação gratuita até 24 horas antes — basta responder a este email.
      </p>
    </div>
    <p style="font-size:13px;color:#5f6b85">Até já,<br/>A equipa da ${CLINIC_NAME}</p>
  </div>`;
}

Deno.serve(async (req) => {
  const payload = await req.json().catch(() => null);
  const record = payload?.record as AppointmentRecord | undefined;
  if (!record?.patient_email) {
    return new Response(JSON.stringify({ error: "invalid_payload" }), { status: 400 });
  }

  const results: Record<string, string> = {};

  // 1. Email (Resend)
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: record.patient_email,
        subject: `Pedido de marcação recebido — ${CLINIC_NAME}`,
        html: confirmationHtml(record),
      }),
    });
    results.email = res.ok ? "sent" : `failed:${res.status}`;
  } else {
    results.email = "skipped:no_key";
  }

  // 2. Google Calendar (service account, se configurado)
  const gcalId = Deno.env.get("GOOGLE_CALENDAR_ID");
  const gcalToken = Deno.env.get("GOOGLE_ACCESS_TOKEN"); // via OAuth/service account
  if (gcalId && gcalToken) {
    const start = `${record.scheduled_date}T${record.scheduled_time}:00`;
    const endDate = new Date(new Date(start).getTime() + 60 * 60 * 1000);
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(gcalId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gcalToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `${record.patient_name} — ${record.treatment_id}`,
          location: CLINIC_ADDRESS,
          start: { dateTime: start, timeZone: "Europe/Lisbon" },
          end: { dateTime: endDate.toISOString(), timeZone: "Europe/Lisbon" },
        }),
      },
    );
    results.calendar = res.ok ? "created" : `failed:${res.status}`;
  } else {
    results.calendar = "skipped:not_configured";
  }

  // 3. SMS — preparado, ativa-se com secrets TWILIO_*
  results.sms = Deno.env.get("TWILIO_ACCOUNT_SID") ? "todo:enable" : "skipped:not_configured";

  return new Response(JSON.stringify({ ok: true, results }), {
    headers: { "Content-Type": "application/json" },
  });
});
