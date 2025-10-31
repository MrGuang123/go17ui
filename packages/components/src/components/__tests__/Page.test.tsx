import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Page } from "../Page";

describe("Page", () => {
  it("renders children inside main area", () => {
    render(<Page>Content</Page>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
