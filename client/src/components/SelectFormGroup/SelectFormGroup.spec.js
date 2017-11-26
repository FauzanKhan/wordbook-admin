import React from 'react';
import { shallow } from 'enzyme';

import SelectFormGroup from './SelectFormGroup';

const LABEL = 'TEST LABEL';
const VALUE = 'TEST VALUE';
const options = [{
  _id: '123',
  name: 'one two three',
}, {
  _id: '234',
  name: 'two three four',
}];

describe('SelectFormGroup', () => {
  const spy = jest.fn();
  const component = shallow(<SelectFormGroup label={LABEL} value={VALUE} onChange={spy} options={options} />);
  const SelectField = component.find('select');

  it('Render a select field with correct Label', () => {
    expect(SelectField.length).toBe(1);
    expect(component.find('label').text()).toBe(LABEL);
  });

  it('Renders all the passed options + placeholder', () => {
    expect(SelectField.find('option').length).toBe(options.length + 1);
  });

  it('Prefills the value', () => {
    expect(SelectField.props().value).toBe(VALUE);
  });

  it('Calls onChange function with changed value when value changes', () => {
    const NEW_VALUE = 'NEW_VALUE';
    SelectField.simulate('change', { target: { value: NEW_VALUE } });
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe(NEW_VALUE);
  });
});
