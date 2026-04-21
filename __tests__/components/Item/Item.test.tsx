import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { ItemProps } from "@/types/props";

import Item from "@/components/Item/Item";

const renderComponent = (props: Partial<ItemProps> = {}): RenderResult => {
  const defaultProps: ItemProps = {
    name: "John Doe",
    age: 30,
    image: "test-image.jpg",
    ...props,
  };
  return render(
    <ul>
      <Item {...defaultProps} />
    </ul>
  );
};

describe("Item", () => {
  describe("rendering", () => {
    it("should render as a list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render with an aria-label combining name and age", () => {
      renderComponent({ name: "Jane Doe", age: 25 });
      expect(screen.getByRole("listitem", { name: "Jane Doe, 25 years old" })).toBeInTheDocument();
    });

    it("should render the profile image with the correct alt text", () => {
      renderComponent({ name: "Alice" });
      expect(screen.getByRole("img", { name: "Profile photo of Alice" })).toBeInTheDocument();
    });

    it("should render the image with the provided src", () => {
      renderComponent({ image: "photo.jpg" });
      expect(screen.getByRole("img")).toHaveAttribute("src", "photo.jpg");
    });

    it("should render the name in a heading", () => {
      renderComponent({ name: "Bob" });
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("should render the age with the years label", () => {
      renderComponent({ age: 42 });
      expect(screen.getByText("42 years")).toBeInTheDocument();
    });

    it("should mark the description container as aria-hidden", () => {
      const { container } = renderComponent();
      const description = container.querySelector(".person__description");
      expect(description).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("accessibility", () => {
    it("should update the aria-label when name and age props change", () => {
      renderComponent({ name: "Carlos", age: 50 });
      expect(screen.getByRole("listitem", { name: "Carlos, 50 years old" })).toBeInTheDocument();
    });

    it("should have an accessible image description tied to the person name", () => {
      renderComponent({ name: "Diana" });
      expect(screen.getByAltText("Profile photo of Diana")).toBeInTheDocument();
    });
  });
});
