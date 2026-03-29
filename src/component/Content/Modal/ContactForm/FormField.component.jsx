import React, { useCallback, useMemo } from "react";

const FormField = React.memo(
  ({
    id,
    label,
    type,
    value,
    onChange,
    error,
    placeholder,
    required = false,
    rows,
  }) => {
    const handleInputChange = useCallback(
      (e) => {
        onChange(id, e.target.value);
      },
      [id, onChange]
    );

    const inputProps = useMemo(
      () => ({
        id,
        name: id,
        value,
        onChange: handleInputChange,
        className: error ? "error" : "",
        placeholder,
        required,
      }),
      [id, value, handleInputChange, error, placeholder, required]
    );

    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>

        {type === "textarea" ? (
          <textarea {...inputProps} rows={rows} />
        ) : (
          <input type={type} {...inputProps} />
        )}

        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
