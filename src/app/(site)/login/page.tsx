import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Área do paciente — Entrar",
  description:
    "Aceda à sua área de paciente: histórico de consultas, plano de exercícios, documentos, relatórios e pagamentos.",
  alternates: { canonical: "/login" },
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section className="hero-field flex min-h-svh items-center justify-center px-5 py-32">
      <LoginForm />
    </section>
  );
}
