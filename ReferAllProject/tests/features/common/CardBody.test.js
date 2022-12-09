import React from 'react';
import { shallow } from 'enzyme';
import { CardBody } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CardBody />);
  expect(renderedComponent.find('.common-card-body').length).toBe(1);
});
