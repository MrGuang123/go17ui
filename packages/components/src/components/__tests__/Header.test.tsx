import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "../Header";

describe("Header", () => {
  it("renders title", () => {
    render(<Header title="Dashboard" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <Header
        navigation={[
          { label: "Home", href: "/" },
          { label: "Settings", href: "/settings" }
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings");
  });
});
