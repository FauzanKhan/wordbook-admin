import React from 'react';

const SelectFormGroup = ({ label, onChange, options, value, ...rest }) => (
  <div {...rest}>
    <label>{label}</label>
    <select
      value={value}
      onChange={({ target: { value }}) => onChange(value)}
    >
      <option defaultChecked>Select</option>
      { options.map(option => (
          <option key={option._id} value={option._id}>{option.name}</option>
        ))
      }
    </select>
  </div>
);

export default SelectFormGroup;