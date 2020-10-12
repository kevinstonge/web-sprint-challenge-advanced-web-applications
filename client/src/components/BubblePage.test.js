import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import fetchColors, { fetchColors as mockFetchColors } from "../api/fetchColors";
import BubblePage from "./BubblePage";

const mockColorData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  }
]

 jest.mock('../api/fetchColors');
 fetchColors.mockResolvedValue(mockColorData);
let container;
test("Fetches data and renders the bubbles", async () => {
  // Finish this test

  act(() => container = render(<BubblePage />));
  await waitFor(() => {
    const colorItems = container.getAllByTestId("colorItem");
    expect(colorItems).toHaveLength(2);
  });
});
