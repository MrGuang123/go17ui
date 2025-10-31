import type { Meta, StoryObj } from "@storybook/react";

import { Button, Header, Page } from "@go17/components";

import { getStoryTranslations } from "./utils/i18n";

const meta = {
  title: "Layout/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen"
  }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);

    return (
      <Page
        {...args}
        header={
          <Header
            title={translations.brand.name}
            navigation={[
              { label: translations.navigation.docs, href: "#" },
              { label: translations.navigation.changelog, href: "#" }
            ]}
            actions={
              <Button variant="primary">{translations.actions.newDashboard}</Button>
            }
          />
        }
        sidebar={
          <div className="space-y-2 text-sm text-[var(--go17-text-secondary)]">
            <p className="text-xs uppercase text-[var(--go17-text-secondary)]">
              {translations.sidebar.quickStart.title}
            </p>
            <a className="block text-[var(--go17-link-hover)] transition-colors" href="#">
              {translations.sidebar.quickStart.links.installation}
            </a>
            <a
              className="block transition-colors hover:text-[var(--go17-link-hover)]"
              href="#"
            >
              {translations.sidebar.quickStart.links.tailwindSetup}
            </a>
          </div>
        }
        footer={
          <p className="text-sm text-[var(--go17-text-secondary)]">
            {translations.footer.help}
          </p>
        }
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-[var(--go17-text-primary)]">
            {translations.hero.heading}
          </h1>
          <p className="text-[var(--go17-text-secondary)]">
            {translations.hero.description}
          </p>
        </div>
      </Page>
    );
  }
};
