import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("toggles the boolean value", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
    act(() => {
      result.current.setOff();
    });
    expect(result.current.value).toBe(false);
  });
});
