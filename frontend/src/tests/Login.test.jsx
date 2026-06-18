import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

test("renders login button", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("button", { name: /login/i })
  ).toBeInTheDocument();
});