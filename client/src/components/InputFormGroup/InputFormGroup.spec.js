import React from 'react';
import { shallow } from 'enzyme';

import InputFormGroup from './InputFormGroup';

const LABEL = 'TEST LABEL';
const VALUE = 'TEST VALUE';

describe('InputFormGroup', () => {
  const spy = jest.fn();
  const Component = shallow(<InputFormGroup label={LABEL} value={VALUE} onChange={spy} />);
  const InputField = Component.find('input[type="text"]');

  it('Render a text field with correct Label', () => {
    expect(InputField.length).toBe(1);
    expect(Component.find('label').text()).toBe(LABEL);
  });

  it('Prefills the value', () => {
    expect(InputField.props().value).toBe(VALUE);
  });

  it('Calls onChange function with changed value when value changes', () => {
    const NEW_VALUE = 'NEW_VALUE';
    InputField.simulate('change', { target: { value: NEW_VALUE } });
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe(NEW_VALUE);
  });
});
