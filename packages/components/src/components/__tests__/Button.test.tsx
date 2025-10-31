import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant specific classes", () => {
    render(<Button variant="secondary">Action</Button>);

    const button = screen.getByRole("button", { name: "Action" });
    expect(button.className).toContain("border");
  });
});
