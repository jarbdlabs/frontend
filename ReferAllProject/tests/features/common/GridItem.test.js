import React from 'react';
import { shallow } from 'enzyme';
import { GridItem } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GridItem />);
  expect(renderedComponent.find('.common-grid-item').length).toBe(1);
});
