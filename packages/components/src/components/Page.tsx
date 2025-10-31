import type { ReactNode } from "react";
import clsx from "clsx";

export interface PageProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Page = ({ header, sidebar, footer, children, className }: PageProps) => {
  return (
    <div
      className={clsx(
        "min-h-screen bg-[var(--go17-surface-background)] text-[var(--go17-text-primary)] transition-colors",
        className
      )}
    >
      {header}
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-6 py-10">
        {sidebar ? <aside className="hidden w-64 shrink-0 lg:block">{sidebar}</aside> : null}
        <main className="flex-1 rounded-lg bg-[var(--go17-surface-card)] p-8 shadow-sm ring-1 ring-[var(--go17-border-contrast)]">
          {children}
        </main>
      </div>
      {footer ? (
        <footer className="border-t border-[var(--go17-border-primary)] bg-[var(--go17-surface-card)] px-6 py-4 text-[var(--go17-text-secondary)]">
          {footer}
        </footer>
      ) : null}
    </div>
  );
};
