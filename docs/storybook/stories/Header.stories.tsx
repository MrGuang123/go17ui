import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@go17/components";
import { Header } from "@go17/components";

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
  args: {
    title: "Go17 UI",
    navigation: [
      { label: "Components", href: "#" },
      { label: "Hooks", href: "#" },
      { label: "Themes", href: "#" }
    ],
    actions: <Button variant="primary">New project</Button>
  }
};

export const Minimal: Story = {
  args: {
    title: "Go17 UI"
  }
};
