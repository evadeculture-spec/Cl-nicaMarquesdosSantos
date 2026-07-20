"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  Dumbbell,
  FileText,
  History,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/area-paciente", label: "Resumo", icon: LayoutDashboard },
  { href: "/area-paciente/consultas", label: "Consultas", icon: CalendarDays },
  { href: "/area-paciente/exercicios", label: "Exercícios", icon: Dumbbell },
  { href: "/area-paciente/historico", label: "Histórico", icon: History },
  { href: "/area-paciente/documentos", label: "Documentos", icon: FileText },
  { href: "/area-paciente/pagamentos", label: "Pagamentos", icon: CreditCard },
];

export function PatientNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Área do paciente" className="lg:sticky lg:top-10 lg:self-start">
      <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-300",
                  active
                    ? "bg-white font-medium text-ink shadow-soft"
                    : "text-slate hover:bg-white/60 hover:text-ink",
                )}
              >
                <item.icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
