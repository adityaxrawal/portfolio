import React, { useState } from "react";
import FormField from "./FormField.component";
import SubmitButton from "./SubmitButton.component";
import { validateContactForm } from "../../../../utils/validation";
import "./ContactForm.component.css";

const ContactForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(formData);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.subject.trim() &&
    formData.message.trim();

  return (
    <div className="contact-form-container">
      <div className="form-legend">
        <span className="required-asterisk">*</span>
        <span className="form-legend-text">Required fields</span>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <FormField
          id="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Your full name"
          required
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="your.email@example.com"
          required
        />

        <FormField
          id="phone"
          label="Phone"
          type="text"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
        />

        <FormField
          id="subject"
          label="Subject"
          type="text"
          value={formData.subject}
          onChange={handleInputChange}
          error={errors.subject}
          placeholder="What's this about?"
          required
        />

        <FormField
          id="message"
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          placeholder="Tell me about your project, opportunity, or just say hello!"
          rows={4}
          required
        />

        <SubmitButton isFormValid={isFormValid} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default ContactForm;
