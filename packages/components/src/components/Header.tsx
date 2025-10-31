import type { ReactNode } from "react";
import clsx from "clsx";

export interface HeaderProps {
  /**
   * Branding or logo element.
   */
  logo?: ReactNode;
  /**
   * Title rendered next to the logo.
   */
  title?: string;
  /**
   * Optional collection of navigation links.
   */
  navigation?: Array<{ label: string; href: string }>;
  /**
   * Slot for right aligned content (e.g. buttons).
   */
  actions?: ReactNode;
  className?: string;
}

export const Header = ({
  logo,
  title,
  navigation,
  actions,
  className
}: HeaderProps) => {
  return (
    <header
      className={clsx(
        "flex items-center justify-between border-b border-[var(--go17-border-primary)] bg-[var(--go17-surface-card)] px-6 py-4 text-[var(--go17-text-primary)] shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {logo ? <div className="h-9 w-9">{logo}</div> : null}
        {title ? (
          <span className="text-lg font-semibold text-[var(--go17-text-primary)]">
            {title}
          </span>
        ) : null}
      </div>
      {navigation && navigation.length ? (
        <nav className="hidden items-center gap-6 text-sm text-[var(--go17-text-secondary)] md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded transition-colors hover:text-[var(--go17-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--go17-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--go17-ring-offset)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
};
