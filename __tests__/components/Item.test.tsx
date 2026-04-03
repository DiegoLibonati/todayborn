import { render, screen } from "@testing-library/react";

import type { ItemProps } from "@/types/props";

import Item from "@/components/Item/Item";

type RenderComponent = {
  container: HTMLElement;
  props: ItemProps;
};

const renderComponent = (overrides?: Partial<ItemProps>): RenderComponent => {
  const props: ItemProps = {
    name: "John Doe",
    age: 30,
    image: "https://example.com/photo.jpg",
    ...overrides,
  };

  const { container } = render(<Item {...props} />);

  return { container, props };
};

describe("Item", () => {
  it("should render a list item", () => {
    renderComponent();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("should have the correct aria-label with name and age", () => {
    renderComponent({ name: "Jane Doe", age: 25 });
    expect(screen.getByRole("listitem")).toHaveAttribute("aria-label", "Jane Doe, 25 years old");
  });

  it("should render the profile image with the correct alt text", () => {
    renderComponent({ name: "Jane Doe" });
    expect(screen.getByRole("img", { name: "Profile photo of Jane Doe" })).toBeInTheDocument();
  });

  it("should render the image with the correct src", () => {
    renderComponent({ image: "https://example.com/photo.jpg" });
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("should render the person's name", () => {
    renderComponent({ name: "Larry Little" });
    expect(screen.getByText("Larry Little")).toBeInTheDocument();
  });

  it("should render the person's age in years", () => {
    renderComponent({ age: 36 });
    expect(screen.getByText("36 years")).toBeInTheDocument();
  });
});
