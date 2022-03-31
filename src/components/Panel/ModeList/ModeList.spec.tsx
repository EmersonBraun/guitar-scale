import { render, screen } from "@testing-library/react";
import React from "react";
import { ModeList } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing ModeList.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <ModeList />
      </ConfigProvider>
    );
    const component = screen.getByTestId("mode-list");
    expect(component).toBeInTheDocument();
  });
});
