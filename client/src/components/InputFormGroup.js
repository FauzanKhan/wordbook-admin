import React from 'react';

const InputFormGroup = ({ label, onChange, value, ...rest }) => (
  <div {...rest}>
    <label>{label}</label>
    <input type="text" value={value} onChange={({ target: { value }}) => onChange(value)} />
  </div>
);

export default InputFormGroup;