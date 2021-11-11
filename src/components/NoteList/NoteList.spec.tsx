import { render, screen } from "@testing-library/react";
import React from "react";
import { NoteList } from ".";
import { ConfigProvider } from "../../context/config";

describe("Testing NoteList.jsx", () => {
  it("should be rendered", () => {
    render(
      <ConfigProvider>
        <NoteList />
      </ConfigProvider>
    );
    const component = screen.getByTestId("note-list");
    expect(component).toBeInTheDocument();
  });
});
