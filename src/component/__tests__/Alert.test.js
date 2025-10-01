// src/components/__tests__/Alert.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "../Alert/alert.component";

describe("Alert Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders alert with message", () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  test("applies correct type class", () => {
    render(
      <Alert message="Test message" type="success" onClose={mockOnClose} />
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-success");
  });

  test("calls onClose when close button is clicked", async () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button", { name: "Close alert" });
    fireEvent.click(closeButton);

    // Wait for the fade-out animation (400ms)
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });
  });

  test("auto-closes after specified duration", async () => {
    render(
      <Alert message="Test message" onClose={mockOnClose} duration={1000} />
    );

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1), {
      timeout: 2000,
    });
  });

  test("does not render when message is empty", () => {
    render(<Alert message="" onClose={mockOnClose} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("has proper accessibility attributes", () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    const closeButton = screen.getByText("×");
    expect(closeButton).toHaveAttribute("class", "close-btn");
  });
});
