import React from 'react';
import PropTypes from 'prop-types';

const SelectFormGroup = ({ label, onChange, options, value, ...rest }) => (
  <div {...rest}>
    <label>{label}</label>
    <select
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    >
      <option defaultChecked>Select</option>
      {
        options.map(option => (
          <option key={option._id} value={option._id}>{option.name}</option>
        ))
      }
    </select>
  </div>
);

SelectFormGroup.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.name,
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SelectFormGroup;
