// components/FormInput.js

import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="input input-bordered w-3/4 "
        required
      />
    </div>
  );
};

export default FormInput;
