import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";

test("renders Home correctly", () => {
  const { queryByText, getByLabelText } = render(<Home />);

  // renders input correctly
  const input = getByLabelText("task-input");

  expect(queryByText(/Enter task:/i)).toBeTruthy();
  expect(input.value).toBe("");

  fireEvent.change(input, { target: { value: "task to do" } });
  expect(input.value).toBe("task to do");
});
