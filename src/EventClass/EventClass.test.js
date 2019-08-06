import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import EventClass from "./index";

describe("EventClass", () => {
  it("renders the name and in collapsed state by default", () => {
    const { getByText, getByTitle } = render(<EventClass name="TestName" />);

    expect(getByText("TestName"));
    expect(getByTitle("expand"));
  });

  it("renders the children after the toggle button is pressed", () => {
    const { getByText, getByTitle } = render(
      <EventClass name="TestName">
        <div>testContent</div>
      </EventClass>
    );

    fireEvent(
      getByTitle("expand"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByText("testContent"));
    expect(getByTitle("collapse"));
  });

  it("renders in expanded state if specified", () => {
    const { getByText, getByTitle } = render(
      <EventClass name="TestName" expanded>
        <div>testContent</div>
      </EventClass>
    );

    expect(getByText("testContent"));
  });

  it("hides the children when collapseBtn is pressed", async () => {
    const { queryByText, getByTitle } = render(
      <EventClass name="TestName" expanded>
        <div>testContent</div>
      </EventClass>
    );

    fireEvent(
      getByTitle("collapse"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    await wait(() => {
      expect(queryByText("testContent")).not.toBeInTheDocument();
    });
  });
});
