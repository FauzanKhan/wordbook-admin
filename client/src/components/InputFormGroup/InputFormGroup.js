import React from 'react';
import PropTypes from 'prop-types';

const InputFormGroup = ({ label, onChange, value, ...rest }) => (
  <div {...rest}>
    <label>{label}</label>
    <input type="text" value={value} onChange={({ target: { value } }) => onChange(value)} />
  </div>
);

InputFormGroup.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InputFormGroup;
