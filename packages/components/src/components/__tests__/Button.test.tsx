import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant specific classes", () => {
    render(<Button variant="success">Success</Button>);

    const button = screen.getByRole("button", { name: "Success" });
    expect(button.className).toContain("bg-[var(--go17-button-success-bg)]");
  });

  it("supports capsule shape", () => {
    render(
      <Button variant="warning" shape="pill">
        Capsule
      </Button>
    );

    const button = screen.getByRole("button", { name: "Capsule" });
    expect(button.className).toContain("rounded-[var(--go17-radius-pill)]");
  });
});
