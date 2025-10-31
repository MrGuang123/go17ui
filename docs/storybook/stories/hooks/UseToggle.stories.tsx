import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@go17/components";
import { useToggle } from "@go17/hooks";

const Demo = () => {
  const toggle = useToggle();
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <p>Value: {toggle.value ? "Enabled" : "Disabled"}</p>
      <div className="flex gap-2">
        <Button onClick={toggle.toggle}>Toggle</Button>
        <Button variant="secondary" onClick={() => setCount((prev) => prev + 1)}>
          Count: {count}
        </Button>
      </div>
    </div>
  );
};

const meta = {
  title: "Hooks/useToggle",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
