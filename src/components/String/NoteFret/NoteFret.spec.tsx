import { render, screen } from "@testing-library/react";
import React from "react";
import { NoteFret } from ".";
import { ConfigProvider } from "../../../context/config";

describe("Testing NoteFret.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <NoteFret
          singleFretmark={false}
          noteIndex={1}
          stringIndex={1}
          doubleFretmark={false}
        />
      </ConfigProvider>
    );
    const component = screen.getByTestId("note-fret");
    expect(component).toBeInTheDocument();
  });
});
