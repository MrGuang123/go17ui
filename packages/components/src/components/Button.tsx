import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--go17-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--go17-ring-offset)] disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[var(--go17-button-primary-bg)] text-[var(--go17-button-primary-text)] hover:bg-[var(--go17-button-primary-bg-hover)] shadow-sm",
  secondary:
    "bg-[var(--go17-button-secondary-bg)] text-[var(--go17-button-secondary-text)] border border-[var(--go17-button-secondary-border)] hover:bg-[var(--go17-button-secondary-hover)] shadow-sm",
  ghost:
    "text-[var(--go17-button-ghost-text)] hover:bg-[var(--go17-button-ghost-hover)]"
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base"
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Choose a visual style of the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Size modifier for the button.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Optionally render an icon or element before the label.
   */
  leadingIcon?: ReactNode;
  /**
   * Optionally render an icon or element after the label.
   */
  trailingIcon?: ReactNode;
}

export const Button = ({
  className,
  children,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {leadingIcon ? <span className="mr-2 inline-flex items-center">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="ml-2 inline-flex items-center">{trailingIcon}</span>
      ) : null}
    </button>
  );
};
