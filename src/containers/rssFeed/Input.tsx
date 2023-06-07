import React from "react";

const InputField = ({
  label,
  type,
  name,
  placeholder = "enter your name",
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
  disabled = false,
}: any) => {
  return (
    <div className="form-group">
      <label className="col-form-label pt-0">{label}</label>
      <input
        className={`form-control ${error ? "inputError" : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <span className="error-message"> {errorMessage ? errorMessage : ""}</span>
    </div>
  );
};

export default InputField;
