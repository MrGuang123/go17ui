import type { Meta, StoryObj } from "@storybook/react";

import { Button, Header } from "@go17/components";

import { getStoryTranslations } from "./utils/i18n";

const meta = {
  title: "Layout/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen"
  }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);

    return (
      <Header
        {...args}
        title={translations.brand.name}
        navigation={[
          { label: translations.navigation.components, href: "#" },
          { label: translations.navigation.hooks, href: "#" },
          { label: translations.navigation.themes, href: "#" }
        ]}
        actions={
          <Button variant="primary">{translations.actions.newProject}</Button>
        }
      />
    );
  }
};

export const Minimal: Story = {
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);

    return <Header {...args} title={translations.brand.name} />;
  }
};
