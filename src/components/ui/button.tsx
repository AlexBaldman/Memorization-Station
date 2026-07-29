import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-4 border-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase font-headline",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-accent hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        success: "bg-success text-success-foreground hover:bg-accent hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        outline: "border-black bg-background text-foreground hover:bg-accent hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        accent: "bg-accent text-accent-foreground hover:bg-primary hover:text-white shadow-[6px_6px_0px_var(--shadow-color)]",
        ghost: "border-transparent active:translate-x-0 active:translate-y-0 hover:bg-black/5 dark:hover:bg-white/5 shadow-none",
        link: "text-primary underline-offset-4 hover:underline border-transparent active:translate-x-0 active:translate-y-0 shadow-none",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-md px-3 text-[10px]",
        lg: "h-14 rounded-md px-10 text-base",
        icon: "h-12 w-12 active:shadow-none p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
