import {
  Activity,
  Brain,
  Footprints,
  Hand,
  Heart,
  MessageSquareText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Footprints,
  Hand,
  Heart,
  MessageSquareText,
  Sparkles,
};

export function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Activity;
  return <Icon className={className} aria-hidden />;
}
