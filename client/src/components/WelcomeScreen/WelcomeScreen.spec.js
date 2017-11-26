import React from 'react';
import { shallow } from 'enzyme';

import WelcomeScreen from './WelcomeScreen';

describe('WelcomeScreen', () => {
  const component = shallow(<WelcomeScreen />);

  it('Renders Link to categories with right text', () => {
    const linkToCategories = component.find('Link[to="/categories"]');
    expect(linkToCategories.length).toBe(1);
    expect(linkToCategories.children().text().toLowerCase()).toBe('categories');
  });

  it('Renders Link to words with right text', () => {
    const linkToWords = component.find('Link[to="/words"]');
    expect(linkToWords.length).toBe(1);
    expect(linkToWords.children().text().toLowerCase()).toBe('words');
  });
});
