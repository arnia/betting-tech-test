import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Event from "./index";

describe("Event", () => {
  it("renders the name", () => {
    const { getByText } = render(<Event name="TestName" eventId={2} />);

    expect(getByText("TestName"));
  });
});
