import React from 'react';
import { shallow } from 'enzyme';

import Table from './Table';

const colHeadings = ['id', 'name'];
const items = [1, 2, 3];

describe('Table', () => {
  const spy = jest.fn();
  const component = shallow(<Table colHeadings={colHeadings} items={items} renderRow={spy} />);

  it('Renders the column headings correctly', () => {
    expect(component.find('th').length).toBe(2);
    component.find('th').children().forEach((c, i) => expect(c.text()).toBe(colHeadings[i]));
  });

  it('Calls renderRow function as many times as the length of items passed', () => {
    expect(spy.mock.calls.length).toBe(items.length);
  });
});
