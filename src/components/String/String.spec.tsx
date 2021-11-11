import { render, screen } from "@testing-library/react";
import React from "react";
import { String } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing String.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <String
          stringIndex={1}
          frets={1}
          doubleFretmarks={[1]}
          singleFretmarks={[1]}
        />
      </ConfigProvider>
    );
    const component = screen.getByTestId("string");
    expect(component).toBeInTheDocument();
  });
});
