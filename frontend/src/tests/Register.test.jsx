import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";

test("renders register button", () => {
  render(<Register />);

  expect(
    screen.getByRole("button", { name: /register/i })
  ).toBeInTheDocument();
});