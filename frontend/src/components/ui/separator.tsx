import { cn } from "../../lib/utils";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

function Separator({
  orientation = "horizontal",
  className,
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-white/10"
          : "w-px self-stretch bg-white/10",
        className
      )}
    />
  );
}

export { Separator };