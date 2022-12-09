import React from 'react';
import { shallow } from 'enzyme';
import { FilledIconInput } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilledIconInput />);
  expect(renderedComponent.find('.common-filled-icon-input').length).toBe(1);
});
