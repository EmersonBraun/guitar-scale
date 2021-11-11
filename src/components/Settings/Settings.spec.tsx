import { render, screen } from "@testing-library/react";
import React from "react";
import { Settings } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing Settings.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <Settings />
      </ConfigProvider>
    );
    const component = screen.getByTestId("settings");
    expect(component).toBeInTheDocument();
  });
});
