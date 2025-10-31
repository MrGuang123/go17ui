export type DemoLocale = "en" | "zh-CN";

const demoTranslations = {
  en: {
    brand: {
      name: "Go17 UI"
    },
    navigation: {
      components: "Components",
      hooks: "Hooks",
      themes: "Themes",
      docs: "Docs",
      changelog: "Changelog"
    },
    sidebar: {
      quickStart: {
        title: "Quick start",
        links: {
          installation: "Installation",
          tailwindSetup: "Tailwind setup"
        }
      },
      theming: {
        title: "Theme",
        activeLabel: "Active"
      }
    },
    hero: {
      heading: "Build consistent interfaces in minutes.",
      description:
        "This integration demo consumes packages from the monorepo to showcase how components and hooks fit together in a real application."
    },
    footer: {
      help: "Need help? Join the community.",
      copyright: "© {year} Go17 UI"
    },
    actions: {
      newProject: "New project",
      newDashboard: "New dashboard",
      getStarted: "Get started",
      toggleTheme: "Toggle theme ({theme})",
      localeToggle: {
        toEnglish: "Switch to English",
        toChinese: "Switch to Chinese"
      }
    },
    buttons: {
      primary: "Primary action",
      secondary: "Secondary action",
      learnMore: "Learn more",
      large: "Large button",
      small: "Small button"
    },
    theme: {
      names: {
        light: "Light",
        dark: "Dark"
      }
    }
  },
  "zh-CN": {
    brand: {
      name: "Go17 UI"
    },
    navigation: {
      components: "组件",
      hooks: "Hooks",
      themes: "主题",
      docs: "文档",
      changelog: "更新日志"
    },
    sidebar: {
      quickStart: {
        title: "快速开始",
        links: {
          installation: "安装",
          tailwindSetup: "Tailwind 配置"
        }
      },
      theming: {
        title: "主题",
        activeLabel: "当前"
      }
    },
    hero: {
      heading: "几分钟内构建一致的界面。",
      description:
        "该集成示例使用单体仓库中的包来展示组件和 hooks 在真实应用中的协作方式。"
    },
    footer: {
      help: "需要帮助？加入社区。",
      copyright: "© {year} Go17 UI"
    },
    actions: {
      newProject: "新项目",
      newDashboard: "新仪表盘",
      getStarted: "开始使用",
      toggleTheme: "切换主题 ({theme})",
      localeToggle: {
        toEnglish: "切换到英文",
        toChinese: "切换到中文"
      }
    },
    buttons: {
      primary: "主要操作",
      secondary: "次要操作",
      learnMore: "了解更多",
      large: "大按钮",
      small: "小按钮"
    },
    theme: {
      names: {
        light: "浅色",
        dark: "深色"
      }
    }
  }
} as const;

const deepFreeze = <T>(value: T): T => {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  Object.freeze(value);

  Object.getOwnPropertyNames(value).forEach((property) => {
    const propertyValue = (value as Record<string | number | symbol, unknown>)[property];
    if (
      typeof propertyValue === "object" &&
      propertyValue !== null &&
      !Object.isFrozen(propertyValue)
    ) {
      deepFreeze(propertyValue);
    }
  });

  return value;
};

const frozenDemoTranslations = deepFreeze(demoTranslations);

export type DemoTranslations = typeof frozenDemoTranslations;
export type DemoMessages<L extends DemoLocale = DemoLocale> = DemoTranslations[L];

export const resolveDemoLocale = (value: unknown): DemoLocale =>
  value === "zh-CN" ? "zh-CN" : "en";

export function getDemoTranslations(): DemoTranslations;
export function getDemoTranslations<L extends DemoLocale>(locale: L): DemoMessages<L>;
export function getDemoTranslations(locale?: DemoLocale) {
  if (locale) {
    return frozenDemoTranslations[locale];
  }
  return frozenDemoTranslations;
}

export const formatDemoTemplate = (
  template: string,
  replacements: Record<string, string | number>
) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(replacements[key] ?? `{${key}}`)
  );
