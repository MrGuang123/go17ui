import { describe, expect, it } from "vitest";
import {
  getComponentTranslations,
  type LocaleMessages
} from "../i18n/translations";

describe("getComponentTranslations", () => {
  it("returns translations for every supported locale when no locale is provided", () => {
    const translations = getComponentTranslations();

    expect(Object.keys(translations).sort()).toEqual(["en", "zh-CN"]);
  });

  it("returns translations for a specific locale", () => {
    const zhTranslations = getComponentTranslations("zh-CN");

    expect(zhTranslations.header.navigation.label).toBe("主导航");
    expect(zhTranslations.button.states.loading).toBe("加载中...");
  });

  it("provides immutable translation maps", () => {
    const enTranslations = getComponentTranslations("en");

    expect(Object.isFrozen(enTranslations)).toBe(true);
    expect(Object.isFrozen(enTranslations.button)).toBe(true);
    expect(Object.isFrozen(enTranslations.button.states)).toBe(true);

    expect(() => {
      (enTranslations as LocaleMessages<"en">).button.states.loading = "test";
    }).toThrow(TypeError);
  });
});
