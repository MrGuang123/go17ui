import { useMemo, useState } from "react";

import { Button, Header, Page, useTheme } from "@go17/components";

import {
  formatDemoTemplate,
  getDemoTranslations,
  resolveDemoLocale,
  type DemoLocale,
  type DemoMessages
} from "../../shared/i18n/demoTranslations";

interface SidebarProps {
  messages: DemoMessages<DemoLocale>;
  themes: string[];
  activeTheme: string;
  setTheme: (themeName: string) => void;
  themeLabels: Record<string, string>;
}

const Sidebar = ({ messages, themes, activeTheme, setTheme, themeLabels }: SidebarProps) => {
  const availableThemes = themes;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xs font-semibold uppercase text-[var(--go17-text-secondary)]">
          {messages.sidebar.quickStart.title}
        </h2>
        <ul className="mt-2 space-y-1 text-sm text-[var(--go17-text-secondary)]">
          <li>
            <a href="#" className="transition-colors hover:text-[var(--go17-link-hover)]">
              {messages.sidebar.quickStart.links.installation}
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-[var(--go17-link-hover)]">
              {messages.sidebar.quickStart.links.tailwindSetup}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase text-[var(--go17-text-secondary)]">
          {messages.sidebar.theming.title}
        </h2>
        <div className="mt-2 space-y-2">
          {availableThemes.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              className="flex w-full items-center justify-between rounded-md border border-[var(--go17-border-contrast)] px-3 py-2 text-left text-sm text-[var(--go17-text-secondary)] transition-colors hover:border-[var(--go17-link-hover)] hover:text-[var(--go17-text-primary)]"
              aria-current={activeTheme === name}
            >
              <span>{themeLabels[name] ?? name}</span>
              {activeTheme === name ? (
                <span className="text-xs font-medium text-[var(--go17-link-hover)]">
                  {messages.sidebar.theming.activeLabel}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [locale, setLocale] = useState<DemoLocale>("en");
  const messages = useMemo(() => getDemoTranslations(locale), [locale]);
  const { theme, themes, setTheme } = useTheme();
  const themeOrder = Object.keys(themes);
  const currentIndex = Math.max(themeOrder.indexOf(theme), 0);
  const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length] ?? theme;
  const themeLabels = useMemo(() => {
    const labelMap: Record<string, string> = {};
    themeOrder.forEach((name) => {
      labelMap[name] =
        messages.theme.names[name as keyof typeof messages.theme.names] ?? name;
    });
    return labelMap;
  }, [messages.theme.names, themeOrder]);

  const navigationLinks = [
    { label: messages.navigation.components, href: "#" },
    { label: messages.navigation.hooks, href: "#" },
    { label: messages.navigation.themes, href: "#" }
  ];

  const localeToggleTarget = locale === "en" ? "zh-CN" : "en";
  const localeToggleLabel =
    localeToggleTarget === "en"
      ? messages.actions.localeToggle.toEnglish
      : messages.actions.localeToggle.toChinese;

  const themeLabel =
    messages.theme.names[theme as keyof typeof messages.theme.names] ?? theme;

  return (
    <Page
      header={
        <Header
          title={messages.brand.name}
          navigation={navigationLinks}
          actions={
            <>
              <Button variant="ghost" onClick={() => setTheme(nextTheme)}>
                {formatDemoTemplate(messages.actions.toggleTheme, {
                  theme: themeLabel
                })}
              </Button>
              <Button variant="ghost" onClick={() => setLocale(resolveDemoLocale(localeToggleTarget))}>
                {localeToggleLabel}
              </Button>
              <Button variant="primary">{messages.actions.getStarted}</Button>
            </>
          }
        />
      }
      sidebar={
        <Sidebar
          messages={messages}
          themes={themeOrder}
          activeTheme={theme}
          setTheme={setTheme}
          themeLabels={themeLabels}
        />
      }
      footer={
        <span className="text-sm text-[var(--go17-text-secondary)]">
          {formatDemoTemplate(messages.footer.copyright, {
            year: new Date().getFullYear()
          })}
        </span>
      }
    >
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--go17-text-primary)]">
          {messages.hero.heading}
        </h1>
        <p className="text-[var(--go17-text-secondary)]">{messages.hero.description}</p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg">{messages.buttons.primary}</Button>
          <Button variant="secondary">{messages.buttons.secondary}</Button>
          <Button variant="ghost" trailingIcon="→">
            {messages.buttons.learnMore}
          </Button>
        </div>
      </section>
    </Page>
  );
};

export default App;
