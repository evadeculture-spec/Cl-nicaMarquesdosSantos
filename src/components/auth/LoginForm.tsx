"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { EASE_CALM } from "@/lib/motion";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setStatus("loading");
    setMessage(null);

    const supabase = createClient();
    // Modo demo: sem Supabase configurado, entra diretamente na área de demonstração.
    if (!supabase) {
      router.push("/area-paciente");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage("Email ou palavra-passe incorretos. Tente novamente.");
      return;
    }
    router.push("/area-paciente");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_CALM }}
      className="w-full max-w-md rounded-3xl border border-line bg-white p-10 shadow-lift"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-azure-50 text-azure-600">
        <LockKeyhole className="size-5" aria-hidden />
      </span>
      <h1 className="text-display mt-6 text-3xl text-ink">Área do paciente</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        O seu histórico, exercícios, documentos e pagamentos — tudo num só
        lugar, protegido.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <Field label="Email" htmlFor="login-email">
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="o.seu@email.pt"
          />
        </Field>
        <Field label="Palavra-passe" htmlFor="login-password">
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        </Field>
        {message && (
          <p role="alert" className="text-sm text-red-600">
            {message}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "A entrar…" : "Entrar"}
        </Button>
      </form>
      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        Primeira vez? O acesso é criado pela clínica na sua primeira consulta.
        <br />
        Esqueceu-se da palavra-passe? Ligue-nos: +351 21 000 00 00.
      </p>
    </motion.div>
  );
}
