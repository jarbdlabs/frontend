import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Card />);
  expect(renderedComponent.find('.common-card').length).toBe(1);
});
