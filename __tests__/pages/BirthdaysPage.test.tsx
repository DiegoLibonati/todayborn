import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockBirthdays } from "@tests/__mocks__/birthdays.mock";

import BirthdaysPage from "@/pages/BirthdaysPage/BirthdaysPage";

interface RenderPage {
  container: HTMLElement;
}

const renderPage = (): RenderPage => {
  const { container } = render(<BirthdaysPage />);
  return { container };
};

describe("BirthdaysPage", () => {
  it("should render the main landmark", () => {
    renderPage();
    expect(screen.getByRole("main", { name: "Today's birthdays" })).toBeInTheDocument();
  });

  it("should display the correct birthday count in the heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      `${mockBirthdays.length} birthdays today`
    );
  });

  it("should render a list item for each birthday", () => {
    renderPage();
    expect(screen.getAllByRole("listitem")).toHaveLength(mockBirthdays.length);
  });

  it("should render the clear button", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: "Clear all birthdays from the list" })
    ).toBeInTheDocument();
  });

  it("should show 0 birthdays today after clicking clear", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));

    expect(await screen.findByText("0 birthdays today")).toBeInTheDocument();
  });

  it("should remove all list items after clicking clear", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));

    await screen.findByText("0 birthdays today");
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
