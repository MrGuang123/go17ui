import type { ThemeDefinition, ThemeCollection } from "@go17/components";
import { defaultThemes } from "@go17/components";

export const coinmarketTheme: ThemeDefinition = {
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
    "button-success-bg": "#16c784",
    "button-success-bg-hover": "#12a262",
    "button-success-text": "#041b14",
    "button-warning-bg": "#f8c400",
    "button-warning-bg-hover": "#d9a400",
    "button-warning-text": "#0b101a",
    "button-danger-bg": "#eb5757",
    "button-danger-bg-hover": "#e53935",
    "button-danger-text": "#2c0505",
    "button-ghost-text": "#7cc4ff",
    "button-ghost-hover": "rgba(120, 187, 255, 0.16)",
    "radius-button": "0.625rem",
    "radius-pill": "999px",
    "focus-ring": "rgba(56, 97, 251, 0.55)",
    "ring-offset": "#0b1426",
    "shadow-soft": "rgba(8, 17, 40, 0.55)"
  }
};

export const sharedThemes: ThemeCollection = {
  coinmarket: coinmarketTheme
};
