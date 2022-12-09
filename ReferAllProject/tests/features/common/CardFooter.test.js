import React from 'react';
import { shallow } from 'enzyme';
import { CardFooter } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CardFooter />);
  expect(renderedComponent.find('.common-card-footer').length).toBe(1);
});
