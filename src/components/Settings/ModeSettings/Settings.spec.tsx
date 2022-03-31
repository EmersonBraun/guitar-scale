import { render, screen } from "@testing-library/react";
import React from "react";
import { ModeSettings } from ".";
import { ConfigProvider } from "../../../context/config";

describe("Testing ModeSettings.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <ModeSettings />
      </ConfigProvider>
    );
    const component = screen.getByTestId("modeSettings");
    expect(component).toBeInTheDocument();
  });
});
