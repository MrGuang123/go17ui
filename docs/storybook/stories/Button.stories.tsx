import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "storybook/test";

import { Button } from "@go17/components";

import { getStoryTranslations } from "./utils/i18n";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);
    return <Button {...args}>{translations.buttons.primary}</Button>;
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary"
  },
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);
    return <Button {...args}>{translations.buttons.secondary}</Button>;
  }
};

export const Large: Story = {
  args: {
    size: "lg"
  },
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);
    return <Button {...args}>{translations.buttons.large}</Button>;
  }
};

export const Small: Story = {
  args: {
    size: "sm"
  },
  render: (args, { globals }) => {
    const translations = getStoryTranslations(globals.locale);
    return <Button {...args}>{translations.buttons.small}</Button>;
  }
};
