import { memo, useCallback, useMemo, ChangeEvent } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const FormField = memo(
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
  }: FormFieldProps) => {
    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(id, e.target.value);
      },
      [id, onChange],
    );

    const inputProps = useMemo(
      () => ({
        id,
        name: id,
        value,
        onChange: handleInputChange,
        className: error ? 'error' : '',
        placeholder,
        required,
      }),
      [id, value, handleInputChange, error, placeholder, required],
    );

    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>

        {type === 'textarea' ? (
          <textarea {...inputProps} rows={rows} />
        ) : (
          <input type={type} {...inputProps} />
        )}

        {error && <span className="error-message">{error}</span>}
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
