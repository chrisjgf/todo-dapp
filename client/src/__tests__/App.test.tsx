import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders header correctly", () => {
  const { queryByText } = render(<App />);

  // renders header
  expect(queryByText(/Task Manager/i)).toBeTruthy();
  expect(queryByText(/Connect wallet/i)).toBeTruthy();
});
