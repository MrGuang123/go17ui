import type { CSSProperties, ElementType, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { defaultThemes } from "./themes";
import type { ThemeCollection, ThemeDefinition } from "./themes";

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

export {
  defaultThemes
};
export type { ThemeDefinition, ThemeCollection } from "./themes";
export type { ThemeName } from "./themes";
