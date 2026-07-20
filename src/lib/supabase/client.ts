"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para componentes de browser.
 * Devolve null em modo demo (sem env vars) — o site continua funcional
 * com os dados de src/content e marcações simuladas.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}
