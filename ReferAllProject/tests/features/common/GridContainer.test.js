import React from 'react';
import { shallow } from 'enzyme';
import { GridContainer } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GridContainer />);
  expect(renderedComponent.find('.common-grid-container').length).toBe(1);
});
