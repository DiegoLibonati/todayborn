import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import TodaybornPage from "@/pages/TodaybornPage/TodaybornPage";

import { mockBirthdays } from "@tests/__mocks__/birthdays.mock";

jest.mock("@/constants/birthdays", () => {
  const mockData = jest.requireActual("@tests/__mocks__/birthdays.mock");
  const { mockBirthdays } = mockData;

  return {
    __esModule: true,
    default: mockBirthdays,
  };
});

const renderPage = (): RenderResult => render(<TodaybornPage />);

describe("TodaybornPage", () => {
  describe("rendering", () => {
    it("should render the main region with the correct aria-label", () => {
      renderPage();
      expect(screen.getByRole("main", { name: "Today's birthdays" })).toBeInTheDocument();
    });

    it("should render the title with the correct birthday count", () => {
      renderPage();
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: `${mockBirthdays.length} birthdays today`,
        })
      ).toBeInTheDocument();
    });

    it("should render the birthday list", () => {
      renderPage();
      expect(screen.getByRole("list", { name: "Birthday list" })).toBeInTheDocument();
    });

    it("should render one list item per birthday", () => {
      renderPage();
      expect(screen.getAllByRole("listitem")).toHaveLength(mockBirthdays.length);
    });

    it("should render each person's name", () => {
      renderPage();
      mockBirthdays.forEach((birthday) => {
        expect(
          screen.getByRole("listitem", { name: `${birthday.name}, ${birthday.age} years old` })
        ).toBeInTheDocument();
      });
    });

    it("should render the clear button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Clear all birthdays from the list" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should remove all list items when the clear button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("should update the title to show 0 birthdays after clearing", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));
      expect(
        screen.getByRole("heading", { level: 2, name: "0 birthdays today" })
      ).toBeInTheDocument();
    });

    it("should keep the birthday list visible after clearing", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));
      expect(screen.getByRole("list", { name: "Birthday list" })).toBeInTheDocument();
    });

    it("should keep the clear button visible after clearing", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Clear all birthdays from the list" }));
      expect(
        screen.getByRole("button", { name: "Clear all birthdays from the list" })
      ).toBeInTheDocument();
    });
  });
});
