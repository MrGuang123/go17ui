import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePrefersColorMode } from "../usePrefersColorMode";

describe("usePrefersColorMode", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns light when matchMedia is unavailable", () => {
    const originalMatchMedia = window.matchMedia;
    // @ts-expect-error we intentionally remove matchMedia for the test case
    window.matchMedia = undefined;

    const { result } = renderHook(() => usePrefersColorMode());
    expect(result.current).toBe("light");

    window.matchMedia = originalMatchMedia;
  });
});
