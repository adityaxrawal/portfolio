// Example usage of the ContactButton component
// This file demonstrates various ways to implement the ContactInfo component

import React from "react";
import ContactButton from "./component/ContactButton/contactButton.component";

const ExampleUsage = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>ContactInfo Component Examples</h1>

      {/* Example 1: Basic Contact Button (Primary) */}
      <section>
        <h2>Primary Contact Button</h2>
        <ContactButton>Contact Me</ContactButton>
      </section>

      {/* Example 2: Secondary Contact Button */}
      <section>
        <h2>Secondary Contact Button</h2>
        <ContactButton variant="secondary" size="large">
          Get In Touch
        </ContactButton>
      </section>

      {/* Example 3: Outline Contact Button */}
      <section>
        <h2>Outline Contact Button</h2>
        <ContactButton variant="outline" size="small">
          Let's Talk
        </ContactButton>
      </section>

      {/* Example 4: Ghost Contact Button */}
      <section>
        <h2>Ghost Contact Button</h2>
        <ContactButton variant="ghost">📧 Send Message</ContactButton>
      </section>

      {/* Example 5: Custom styled Contact Button */}
      <section>
        <h2>Custom Styled Contact Button</h2>
        <ContactButton
          className="my-custom-button"
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            borderRadius: "25px",
          }}
        >
          🚀 Let's Build Something
        </ContactButton>
      </section>

      {/* Example 6: Integration in a Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "3rem 2rem",
          borderRadius: "12px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>Ready to Start Your Project?</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 }}>
          Let's discuss your ideas and bring them to life together.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ContactButton size="large">💼 Hire Me</ContactButton>
          <ContactButton variant="secondary" size="large">
            📄 View Resume
          </ContactButton>
        </div>
      </section>

      {/* Example 7: In a Card Layout */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>Frontend Development</h3>
          <p>React, Vue, Angular - Modern web applications</p>
          <ContactButton variant="outline" size="medium">
            Discuss Project
          </ContactButton>
        </div>

        <div
          style={{
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>Backend Development</h3>
          <p>Node.js, Python, APIs & Database design</p>
          <ContactButton variant="outline" size="medium">
            Get Quote
          </ContactButton>
        </div>
      </section>

      {/* Implementation Notes */}
      <section
        style={{
          background: "#f8fafc",
          padding: "2rem",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <h2>Implementation Notes</h2>
        <div style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
          <h3>Features Included:</h3>
          <ul>
            <li>✅ Modal with step-based flow (Options → Form)</li>
            <li>✅ LinkedIn and GitHub profile links</li>
            <li>✅ Contact form with validation</li>
            <li>✅ Form submission to http://localhost:8080/contact</li>
            <li>✅ Loading states and error handling</li>
            <li>✅ Toast notifications via Alert component</li>
            <li>✅ Dark/Light theme support</li>
            <li>✅ Responsive design</li>
            <li>✅ Accessibility features (ESC key, focus management)</li>
            <li>✅ Tailwind-inspired CSS styling</li>
          </ul>

          <h3>Form Validation:</h3>
          <ul>
            <li>Name: Required</li>
            <li>Email: Required + format validation</li>
            <li>Phone: Optional</li>
            <li>Subject: Required</li>
            <li>Message: Required</li>
          </ul>

          <h3>API Expected Response:</h3>
          <pre
            style={{
              background: "#1f2937",
              color: "#f3f4f6",
              padding: "1rem",
              borderRadius: "6px",
              fontSize: "0.875rem",
              overflow: "auto",
            }}
          >
            {`// POST http://localhost:8080/contact
// Request Body:
{
  "name": "Aditya Rawal",
  "email": "test@example.com", 
  "phone": "+91-9876543210", // optional
  "subject": "Portfolio Website Inquiry",
  "message": "Hi Aditya, I came across your portfolio..."
}

// Success Response: HTTP 200
// Error Response: HTTP 4xx/5xx with { "message": "Error description" }`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ExampleUsage;
