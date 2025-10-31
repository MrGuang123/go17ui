import { Button, Header, Page, useTheme } from "@go17/components";

const Sidebar = () => {
  const { theme, themes, setTheme } = useTheme();
  const availableThemes = Object.keys(themes);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xs font-semibold uppercase text-[var(--go17-text-secondary)]">
          Quick start
        </h2>
        <ul className="mt-2 space-y-1 text-sm text-[var(--go17-text-secondary)]">
          <li>
            <a href="#" className="transition-colors hover:text-[var(--go17-link-hover)]">
              Installation
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-[var(--go17-link-hover)]">
              Tailwind setup
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase text-[var(--go17-text-secondary)]">
          Theme
        </h2>
        <div className="mt-2 space-y-2">
          {availableThemes.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              className="flex w-full items-center justify-between rounded-md border border-[var(--go17-border-contrast)] px-3 py-2 text-left text-sm text-[var(--go17-text-secondary)] transition-colors hover:border-[var(--go17-link-hover)] hover:text-[var(--go17-text-primary)]"
              aria-current={theme === name}
            >
              <span className="capitalize">{name}</span>
              {theme === name ? (
                <span className="text-xs font-medium text-[var(--go17-link-hover)]">Active</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const links = [
  { label: "Components", href: "#" },
  { label: "Hooks", href: "#" },
  { label: "Themes", href: "#" }
];

const App = () => {
  const { theme, themes, setTheme } = useTheme();
  const themeOrder = Object.keys(themes);
  const currentIndex = Math.max(themeOrder.indexOf(theme), 0);
  const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length] ?? theme;

  return (
    <Page
      header={
        <Header
          title="Go17 UI"
          navigation={links}
          actions={
            <>
              <Button variant="ghost" onClick={() => setTheme(nextTheme)}>
                Toggle theme ({theme})
              </Button>
              <Button variant="primary">Get started</Button>
            </>
          }
        />
      }
      sidebar={<Sidebar />}
      footer={
        <span className="text-sm text-[var(--go17-text-secondary)]">
          © {new Date().getFullYear()} Go17 UI
        </span>
      }
    >
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--go17-text-primary)]">
          Build consistent interfaces in minutes.
        </h1>
        <p className="text-[var(--go17-text-secondary)]">
          This integration demo consumes packages from the monorepo to showcase how components
          and hooks fit together in a real application.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg">Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost" trailingIcon="→">
            Learn more
          </Button>
        </div>
      </section>
    </Page>
  );
};

export default App;
