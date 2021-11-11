import { render, screen } from "@testing-library/react";
import React from "react";
import { Instrument } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing Instrument.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <Instrument />
      </ConfigProvider>
    );
    const component = screen.getByTestId("instrument");
    expect(component).toBeInTheDocument();
  });
});
