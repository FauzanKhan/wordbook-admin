import React from 'react';
import { shallow } from 'enzyme';

import WordForm from './WordForm';

describe('WordForm', () => {
  const submitSpy = jest.fn();
  const getCategoriesSpy = jest.fn();
  const component = shallow(<WordForm onSubmit={submitSpy} getCategories={getCategoriesSpy} />);

  it('Renders a form', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('Renders InputFormGroups for Word, Definition, Synonymns, ImageUrl', () => {
    const inputFormGroupFields = ['Word', 'Definition', 'Synonymns', 'ImageUrl'];
    expect(component.find('InputFormGroup').length).toBe(inputFormGroupFields.length);
  });

  it('Calls getCategories on mount if categories are not passed', () => {
    expect(getCategoriesSpy.mock.calls.length).toBe(1);
  });

  it('Renders a link to go back to words list', () => {
    expect(component.find('Link[to="/words"]').length).toBe(1);
  });
});
