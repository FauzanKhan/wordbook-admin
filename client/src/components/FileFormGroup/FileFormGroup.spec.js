import React from 'react';
import { shallow } from 'enzyme';

import FileFormGroup from './FileFormGroup';

const LABEL = 'TEST_LABEL';

describe('FileFormGroup', () => {
  const Component = shallow(<FileFormGroup label={LABEL} />);

  it('Renders a file input with correct label', () => {
    expect(Component.find('input[type="file"]').length).toBe(1);
    expect(Component.find('label').text()).toBe(LABEL);
  });

  it('Calls handleChange method when file input changes', () => {
    const spy = jest.spyOn(Component.instance(), 'handleChange');
    const target = {
      value: 'test',
      files: [new Blob(['fileContents'], { type: 'text/plain' })],
    };
    Component.find('input[type="file"]').simulate('change', { target });
    expect(spy).toHaveBeenCalledWith(target.value, target.files);
  });
});
