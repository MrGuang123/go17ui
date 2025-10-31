import type { CSSProperties, ElementType, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export interface ThemeDefinition {
  tokens: Record<string, string>;
  colorScheme?: "light" | "dark";
}

export type ThemeCollection = Record<string, ThemeDefinition>;

const lightTheme: ThemeDefinition = {
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
    "button-ghost-text": "rgb(79 70 229)",
    "button-ghost-hover": "rgba(79, 70, 229, 0.12)",
    "focus-ring": "rgba(129, 140, 248, 0.45)",
    "ring-offset": "rgb(248 250 252)",
    "shadow-soft": "rgba(15, 23, 42, 0.08)"
  }
};

const darkTheme: ThemeDefinition = {
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
    "button-ghost-text": "rgb(196 181 253)",
    "button-ghost-hover": "rgba(129, 140, 248, 0.16)",
    "focus-ring": "rgba(129, 140, 248, 0.55)",
    "ring-offset": "rgb(15 23 42)",
    "shadow-soft": "rgba(2, 6, 23, 0.4)"
  }
};

export const defaultThemes: ThemeCollection = {
  light: lightTheme,
  dark: darkTheme
};

interface ThemeContextValue {
  theme: string;
  themes: ThemeCollection;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  initialTheme?: string;
  theme?: string;
  themes?: ThemeCollection;
  onThemeChange?: (themeName: string) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  applyToDocument?: boolean;
}

export const ThemeProvider = ({
  initialTheme = "light",
  theme: controlledTheme,
  themes: customThemes = {},
  onThemeChange,
  children,
  className,
  style: styleProp,
  as: Component = "div",
  applyToDocument = true
}: ThemeProviderProps) => {
  const mergedThemes = useMemo<ThemeCollection>(
    () => ({ ...defaultThemes, ...customThemes }),
    [customThemes]
  );

  const getValidTheme = useCallback(
    (name?: string) => (name && mergedThemes[name] ? name : undefined),
    [mergedThemes]
  );

  const [internalTheme, setInternalTheme] = useState<string>(() => {
    return (
      getValidTheme(controlledTheme) ??
      getValidTheme(initialTheme) ??
      Object.keys(mergedThemes)[0]
    );
  });

  useEffect(() => {
    const next = getValidTheme(controlledTheme);
    if (next) {
      setInternalTheme(next);
    }
  }, [controlledTheme, getValidTheme]);

  useEffect(() => {
    if (!mergedThemes[internalTheme]) {
      const fallback =
        getValidTheme(initialTheme) ?? Object.keys(mergedThemes)[0];
      setInternalTheme(fallback);
    }
  }, [initialTheme, internalTheme, mergedThemes, getValidTheme]);

  const activeTheme = getValidTheme(controlledTheme) ?? internalTheme;
  const activeDefinition =
    mergedThemes[activeTheme] ?? defaultThemes.light;

  const themeStyle = useMemo(() => {
    const styles: CSSProperties = {
      colorScheme: activeDefinition.colorScheme ?? "light"
    };

    Object.entries(activeDefinition.tokens).forEach(([token, value]) => {
      (styles as Record<string, string | number>)[`--go17-${token}`] = value;
    });

    return styles;
  }, [activeDefinition]);

  const combinedStyle = useMemo(
    () => ({ ...themeStyle, ...(styleProp ?? {}) }),
    [styleProp, themeStyle]
  );

  const setTheme = useCallback(
    (next: string) => {
      if (!mergedThemes[next]) {
        return;
      }
      if (!controlledTheme) {
        setInternalTheme(next);
      }
      onThemeChange?.(next);
    },
    [controlledTheme, mergedThemes, onThemeChange]
  );

  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.setAttribute("data-go17-theme", activeTheme);
    root.style.setProperty(
      "color-scheme",
      activeDefinition.colorScheme ?? "light"
    );

    Object.entries(activeDefinition.tokens).forEach(([token, value]) => {
      root.style.setProperty(`--go17-${token}`, value);
    });

    return () => {
      Object.keys(activeDefinition.tokens).forEach((token) => {
        root.style.removeProperty(`--go17-${token}`);
      });
      if (root.getAttribute("data-go17-theme") === activeTheme) {
        root.removeAttribute("data-go17-theme");
      }
      if (root.style.getPropertyValue("color-scheme")) {
        root.style.removeProperty("color-scheme");
      }
    };
  }, [activeDefinition, activeTheme, applyToDocument]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme: activeTheme,
      themes: mergedThemes,
      setTheme
    }),
    [activeTheme, mergedThemes, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <Component
        data-go17-theme={activeTheme}
        className={className}
        style={combinedStyle}
      >
        {children}
      </Component>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export type ThemeName = keyof typeof defaultThemes;
