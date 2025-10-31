import type { Preview } from "@storybook/react-webpack5";
import type { Decorator } from "@storybook/react";

import { ThemeProvider, defaultThemes } from "@go17/components";

import { sharedThemes } from "../../shared/themes";
import "./preview.css";

const availableThemes = [
  ...new Set([...Object.keys(defaultThemes), ...Object.keys(sharedThemes)])
];

const themeTitles: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  coinmarket: "CoinMarket"
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: availableThemes.map((value) => ({
        value,
        title: themeTitles[value] ?? value
      }))
    }
  },
  locale: {
    name: "Locale",
    description: "Language for story content",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "zh-CN", title: "简体中文" }
      ]
    }
  }
};

const withTheme: Decorator = (Story, context) => {
  const currentTheme = (context.globals.theme as string) ?? "light";
  return (
    <ThemeProvider theme={currentTheme} themes={sharedThemes} applyToDocument>
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
