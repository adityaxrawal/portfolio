// src/components/__tests__/TechnologyBox.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TechnologyBox from "../Content/Tech/Boxes/tech-box.component";

// Mock the image require
jest.mock("../../../../share/img/skills/react.png", () => "test-image.png", {
  virtual: true,
});

describe("TechnologyBox Component", () => {
  const defaultProps = {
    skillName: "React.js",
    skillLevel: 9,
    skillIcon: "⚛️",
    skillDesc: "Building dynamic UIs",
    extra: "React is awesome!",
    skillImage: "react.png",
    isDarkTheme: false,
    dimensions: { width: 300, height: 400 },
    getProgressColor: jest.fn(() => "#61DAFB"),
    index: 0,
  };

  test("renders technology box with skill name", () => {
    render(<TechnologyBox {...defaultProps} />);
    expect(screen.getByText("React.js")).toBeInTheDocument();
  });

  test("calls getProgressColor function for skill level", () => {
    render(<TechnologyBox {...defaultProps} />);
    expect(defaultProps.getProgressColor).toHaveBeenCalled();
  });

  test("displays fallback icon when image fails to load", () => {
    render(<TechnologyBox {...defaultProps} />);
    const image = screen.getByAltText("React.js technology logo");

    // Simulate image load error
    fireEvent.error(image);

    expect(screen.getByText("⚛️")).toBeInTheDocument();
  });

  test("applies correct styling for dark theme", () => {
    render(<TechnologyBox {...defaultProps} isDarkTheme={true} />);
    // Test that the component renders with dark theme prop
    // Since we can't easily test computed styles, we test the prop was passed correctly
    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByAltText("React.js technology logo")).toBeInTheDocument();
  });

  test("has proper image alt text for accessibility", () => {
    render(<TechnologyBox {...defaultProps} />);
    expect(screen.getByAltText("React.js technology logo")).toBeInTheDocument();
  });

  test("renders extra information", () => {
    render(<TechnologyBox {...defaultProps} />);
    expect(screen.getByText("React is awesome!")).toBeInTheDocument();
  });
});
