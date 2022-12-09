import React from 'react';
import { shallow } from 'enzyme';
import { Sidebar } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Sidebar />);
  expect(renderedComponent.find('.common-sidebar').length).toBe(1);
});
