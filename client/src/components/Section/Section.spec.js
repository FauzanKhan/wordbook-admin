import React from 'react';
import { shallow } from 'enzyme';

import Section from './Section';

const RESOURCE = 'categories';
const DummyComponent = () => <div>This is a dummy component</div>;

describe('Section', () => {
  const component = shallow(<Section resource={RESOURCE}><DummyComponent /></Section>);

  it('Renders heading reading the name of resource', () => {
    expect(component.find('h4').text()).toBe(RESOURCE);
  });

  it('Renders a link to create a new resource', () => {
    const newResourceLink = component.find(`Link[to="/${RESOURCE}/new"]`);
    expect(newResourceLink.length).toBe(1);
    expect(newResourceLink.children().text().toLowerCase()).toBe(`add new ${RESOURCE}`);
  });

  it('Renders childrens', () => {
    expect(component.find(DummyComponent).length).toBe(1);
  });
});
