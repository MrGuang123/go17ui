type NormalizeLocale<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : NormalizeLocale<T[K]>;
};

export const en = {
  header: {
    navigation: {
      label: "Primary navigation"
    },
    actions: {
      label: "Header actions"
    }
  },
  button: {
    label: {
      default: "Button"
    },
    states: {
      loading: "Loading..."
    }
  },
  page: {
    accessibility: {
      skipToContent: "Skip to main content"
    },
    footer: {
      legal: "All rights reserved."
    }
  }
} as const;

export type LocaleMessages = typeof en;
export type LocaleDefinition = NormalizeLocale<LocaleMessages>;
