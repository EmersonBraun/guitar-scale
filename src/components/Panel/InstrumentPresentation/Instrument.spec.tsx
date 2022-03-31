import { render, screen } from "@testing-library/react";
import React from "react";
import { InstrumentPresentation } from ".";
import { ConfigProvider } from "../../../context/config";

describe("Testing InstrumentPresentation.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <InstrumentPresentation />
      </ConfigProvider>
    );
    const component = screen.getByTestId("instrumentPresentation");
    expect(component).toBeInTheDocument();
  });
});
