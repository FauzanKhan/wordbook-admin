import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {
  const Component = shallow(<Header />);

  it('has link to Home with title \'VocaBook\'', () => {
    const LinkToHome = Component.find('Link[to="/"]');
    expect(LinkToHome.length).toBe(1);
    expect(LinkToHome.children().text()).toBe('VocaBook');
  });

  it('has link to categories list with title \'Categories\'', () => {
    const LinkToCategories = Component.find('Link[to="/categories"]');
    expect(LinkToCategories.length).toBe(1);
    expect(LinkToCategories.children().text()).toBe('Categories');
  });

  it('has link to words list with title \'Words\'', () => {
    const LinkToWords = Component.find('Link[to="/words"]');
    expect(LinkToWords.length).toBe(1);
    expect(LinkToWords.children().text()).toBe('Words');
  });
});
