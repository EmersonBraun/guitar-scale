import { render, screen } from "@testing-library/react";
import React from "react";
import { Note } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing Note.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <Note name="C" selected={false} />
      </ConfigProvider>
    );
    const component = screen.getByTestId("note");
    expect(component).toBeInTheDocument();
  });
});
