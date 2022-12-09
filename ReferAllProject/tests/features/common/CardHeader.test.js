import React from 'react';
import { shallow } from 'enzyme';
import { CardHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CardHeader />);
  expect(renderedComponent.find('.common-card-header').length).toBe(1);
});
