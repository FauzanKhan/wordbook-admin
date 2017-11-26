import React from 'react';
import { shallow } from 'enzyme';

import CategoryForm from './CategoryForm';

describe.only('CategoryForm', () => {
  const spy = jest.fn();
  const Component = shallow(<CategoryForm onSubmit={spy} />);

  it('Renders a form', () => {
    expect(Component.find('form').length).toBe(1);
  });

  it('Renders form group for category name & icon', () => {
    expect(Component.find('InputFormGroup[data-e2e="name"]').length).toBe(1);
    expect(Component.find('InputFormGroup[data-e2e="icon"]').length).toBe(1);
  });

  it('Calls onSubmit callback on submission', () => {
    Component.find('form').simulate('submit', { preventDefault() {} });
    expect(spy.mock.calls.length).toBe(1);
  });

  it('Renders a link to go back to categories list', () => {
    expect(Component.find('Link[to="/categories"]').length).toBe(1);
  });
});
