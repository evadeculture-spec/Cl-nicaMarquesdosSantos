import {
  Activity,
  Baby,
  Brain,
  Dumbbell,
  Flower2,
  Hand,
  Heart,
  HeartPulse,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Brain,
  Dumbbell,
  Flower2,
  Hand,
  Heart,
  HeartPulse,
  Smile,
  Sparkles,
};

export function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Activity;
  return <Icon className={className} aria-hidden />;
}
