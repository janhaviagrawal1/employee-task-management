import { render, screen } from "@testing-library/react";
import Tasks from "../pages/Tasks";

test("renders tasks page", () => {
  render(<Tasks />);
  expect(screen.getByText(/task management/i)).toBeInTheDocument();
});