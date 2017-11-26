import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

const baseRoutes = ['/', '/words', '/categories'];

describe('App', () => {
  const Component = shallow(<App />);

  it('Renders the app container', () => {
    expect(Component.find('[data-e2e="app"]').length).toBe(1);
  });

  it('Renders Header', () => {
    expect(Component.find('Header').length).toBe(1);
  });

  it('Renders the base routes', () => {
    expect(Component.find('Route').length).toBe(baseRoutes.length);
    baseRoutes.forEach(route =>
      expect(Component.find(`Route[path="${route}"]`).length).toBe(1));
  });
});
