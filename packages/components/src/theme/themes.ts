export interface ThemeDefinition {
  tokens: Record<string, string>;
  colorScheme?: "light" | "dark";
}

export type ThemeCollection = Record<string, ThemeDefinition>;

export const lightTheme: ThemeDefinition = {
  colorScheme: "light",
  tokens: {
    "surface-background": "rgb(248 250 252)",
    "surface-card": "rgb(255 255 255)",
    "surface-subtle": "rgb(241 245 249)",
    "text-primary": "rgb(15 23 42)",
    "text-secondary": "rgb(71 85 105)",
    "text-muted": "rgb(100 116 139)",
    "text-inverse": "rgb(255 255 255)",
    "border-primary": "rgb(226 232 240)",
    "border-contrast": "rgba(148, 163, 184, 0.35)",
    "link-hover": "rgb(79 70 229)",
    "button-primary-bg": "rgb(79 70 229)",
    "button-primary-bg-hover": "rgb(99 102 241)",
    "button-primary-text": "rgb(255 255 255)",
    "button-secondary-bg": "rgb(255 255 255)",
    "button-secondary-text": "rgb(15 23 42)",
    "button-secondary-border": "rgb(226 232 240)",
    "button-secondary-hover": "rgb(241 245 249)",
    "button-success-bg": "rgb(22 163 74)",
    "button-success-bg-hover": "rgb(21 128 61)",
    "button-success-text": "rgb(255 255 255)",
    "button-warning-bg": "rgb(250 204 21)",
    "button-warning-bg-hover": "rgb(245 158 11)",
    "button-warning-text": "rgb(30 41 59)",
    "button-danger-bg": "rgb(239 68 68)",
    "button-danger-bg-hover": "rgb(220 38 38)",
    "button-danger-text": "rgb(255 255 255)",
    "button-ghost-text": "rgb(79 70 229)",
    "button-ghost-hover": "rgba(79, 70, 229, 0.12)",
    "radius-sm": "0.25rem",
    "radius-md": "0.5rem",
    "radius-lg": "0.75rem",
    "radius-button": "0.5rem",
    "radius-pill": "999px",
    "focus-ring": "rgba(129, 140, 248, 0.45)",
    "ring-offset": "rgb(248 250 252)",
    "shadow-soft": "rgba(15, 23, 42, 0.08)"
  }
};

export const darkTheme: ThemeDefinition = {
  colorScheme: "dark",
  tokens: {
    "surface-background": "rgb(15 23 42)",
    "surface-card": "rgb(30 41 59)",
    "surface-subtle": "rgb(22 33 62)",
    "text-primary": "rgb(226 232 240)",
    "text-secondary": "rgb(148 163 184)",
    "text-muted": "rgb(100 116 139)",
    "text-inverse": "rgb(15 23 42)",
    "border-primary": "rgb(71 85 105)",
    "border-contrast": "rgba(148, 163, 184, 0.45)",
    "link-hover": "rgb(196 181 253)",
    "button-primary-bg": "rgb(99 102 241)",
    "button-primary-bg-hover": "rgb(129 140 248)",
    "button-primary-text": "rgb(255 255 255)",
    "button-secondary-bg": "rgb(30 41 59)",
    "button-secondary-text": "rgb(226 232 240)",
    "button-secondary-border": "rgb(71 85 105)",
    "button-secondary-hover": "rgb(51 65 85)",
    "button-success-bg": "rgb(34 197 94)",
    "button-success-bg-hover": "rgb(22 163 74)",
    "button-success-text": "rgb(5 46 22)",
    "button-warning-bg": "rgb(250 204 21)",
    "button-warning-bg-hover": "rgb(234 179 8)",
    "button-warning-text": "rgb(24 16 2)",
    "button-danger-bg": "rgb(248 113 113)",
    "button-danger-bg-hover": "rgb(239 68 68)",
    "button-danger-text": "rgb(69 10 10)",
    "button-ghost-text": "rgb(196 181 253)",
    "button-ghost-hover": "rgba(129, 140, 248, 0.16)",
    "radius-sm": "0.25rem",
    "radius-md": "0.5rem",
    "radius-lg": "0.75rem",
    "radius-button": "0.5rem",
    "radius-pill": "999px",
    "focus-ring": "rgba(129, 140, 248, 0.55)",
    "ring-offset": "rgb(15 23 42)",
    "shadow-soft": "rgba(2, 6, 23, 0.4)"
  }
};

export const defaultThemes: ThemeCollection = {
  light: lightTheme,
  dark: darkTheme
};

export type ThemeName = keyof typeof defaultThemes;
