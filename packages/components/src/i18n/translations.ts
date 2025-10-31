import { en } from "./locales/en";
import { zhCN } from "./locales/zh-CN";

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

const rawTranslations = {
  en,
  "zh-CN": zhCN
} as const;

const translations = deepFreeze(rawTranslations);

export type SupportedLocale = keyof typeof translations;
export type LocaleMessages<L extends SupportedLocale = SupportedLocale> = (typeof translations)[L];
export type AllComponentTranslations = typeof translations;

export function getComponentTranslations(): AllComponentTranslations;
export function getComponentTranslations<L extends SupportedLocale>(locale: L): LocaleMessages<L>;
export function getComponentTranslations(locale?: SupportedLocale) {
  if (locale) {
    return translations[locale];
  }

  return translations;
}
