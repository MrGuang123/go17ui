import type { Preview } from "@storybook/react-webpack5";
import type { Decorator } from "@storybook/react";

import { ThemeProvider, defaultThemes } from "@go17/components";

import "./preview.css";

const availableThemes = Object.keys(defaultThemes);

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: availableThemes.map((value) => ({
        value,
        title: value.charAt(0).toUpperCase() + value.slice(1)
      }))
    }
  }
};

const withTheme: Decorator = (Story, context) => {
  const currentTheme = (context.globals.theme as string) ?? "light";
  return (
    <ThemeProvider theme={currentTheme} applyToDocument>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [withTheme]
};

export default preview;
