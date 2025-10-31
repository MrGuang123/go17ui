import { defaultThemes } from "@go17/components";
import type { ThemeCollection } from "@go17/components";

export const integrationThemes: ThemeCollection = {
  coinmarket: {
    ...defaultThemes.dark,
    tokens: {
      ...defaultThemes.dark.tokens,
      "surface-background": "#0b1426",
      "surface-card": "#101c3d",
      "surface-subtle": "#18264b",
      "text-primary": "#ffffff",
      "text-secondary": "#adc6ff",
      "text-muted": "#8496c5",
      "text-inverse": "#050915",
      "border-primary": "rgba(78, 118, 255, 0.24)",
      "border-contrast": "rgba(43, 72, 147, 0.48)",
      "link-hover": "#3861fb",
      "button-primary-bg": "#3861fb",
      "button-primary-bg-hover": "#274bdb",
      "button-primary-text": "#ffffff",
      "button-secondary-bg": "#101c3d",
      "button-secondary-text": "#ffffff",
      "button-secondary-border": "rgba(78, 118, 255, 0.35)",
      "button-secondary-hover": "#18264b",
      "button-ghost-text": "#7cc4ff",
      "button-ghost-hover": "rgba(120, 187, 255, 0.16)",
      "focus-ring": "rgba(56, 97, 251, 0.55)",
      "ring-offset": "#0b1426",
      "shadow-soft": "rgba(8, 17, 40, 0.55)"
    }
  }
};
