import React from 'react';
import { shallow } from 'enzyme';
import { CardStyle } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CardStyle />);
  expect(renderedComponent.find('.common-card-style').length).toBe(1);
});
