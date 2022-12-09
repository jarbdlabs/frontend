import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Button />);
  expect(renderedComponent.find('.common-button').length).toBe(1);
});
