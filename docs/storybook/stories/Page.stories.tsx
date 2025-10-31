import type { Meta, StoryObj } from "@storybook/react";

import { Button, Header, Page } from "@go17/components";

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
  args: {
    header: (
      <Header
        title="Go17 UI"
        navigation={[
          { label: "Docs", href: "#" },
          { label: "Changelog", href: "#" }
        ]}
        actions={<Button variant="primary">New dashboard</Button>}
      />
    ),
    sidebar: (
      <div className="space-y-2 text-sm text-[var(--go17-text-secondary)]">
        <p className="text-xs uppercase text-[var(--go17-text-secondary)]">Get started</p>
        <a className="block text-[var(--go17-link-hover)] transition-colors" href="#">
          Installation
        </a>
        <a
          className="block transition-colors hover:text-[var(--go17-link-hover)]"
          href="#"
        >
          Theming
        </a>
      </div>
    ),
    footer: (
      <p className="text-sm text-[var(--go17-text-secondary)]">
        Need help? Join the community.
      </p>
    ),
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-[var(--go17-text-primary)]">
          Build consistent user interfaces
        </h1>
        <p className="text-[var(--go17-text-secondary)]">
          The Page component composes header, sidebar, and footer slots helping you scaffold
          application layouts quickly.
        </p>
      </div>
    )
  }
};
