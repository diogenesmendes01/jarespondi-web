import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { tokens } from "@/lib/design-tokens";

interface ActionButtonProps {
  icon: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function ActionButton({
  icon: Icon,
  children,
  onClick,
  variant = "outline",
  size = "sm",
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`flex items-center gap-1.5 ${className}`}
    >
      <Icon size={tokens.icons.sizes.sm} strokeWidth={tokens.icons.strokeWidth.normal} />
      <span>{children}</span>
    </Button>
  );
}
