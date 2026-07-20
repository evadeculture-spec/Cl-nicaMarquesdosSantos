import Image from "next/image";
import { cn } from "@/lib/utils";

/** Símbolo da marca — mãos que acolhem, sobre dourado. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/icon.svg"
      alt=""
      aria-hidden
      width={28}
      height={28}
      className={cn("rounded-lg", className)}
    />
  );
}
