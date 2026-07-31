import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-sky-500 text-white hover:bg-sky-600",
        outline:
          "border border-white/10 bg-transparent hover:bg-white/5",
        secondary:
          "bg-zinc-800 text-white hover:bg-zinc-700",
        ghost:
          "hover:bg-white/5",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        link:
          "text-sky-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    />
  );
}

export { buttonVariants };