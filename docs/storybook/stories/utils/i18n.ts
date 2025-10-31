import {
  getDemoTranslations,
  resolveDemoLocale,
  type DemoLocale,
  type DemoMessages
} from "../../../shared/i18n/demoTranslations";

export const resolveStoryLocale = (value: unknown): DemoLocale =>
  resolveDemoLocale(value);

export const getStoryTranslations = (value: unknown): DemoMessages<DemoLocale> =>
  getDemoTranslations(resolveStoryLocale(value));
