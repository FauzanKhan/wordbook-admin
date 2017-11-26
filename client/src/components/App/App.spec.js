import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  const Component = shallow(<App />);

  it('Renders the app container', () => {
    expect(Component.find('[data-e2e="app"]').length).toBe(1);
  });
});
