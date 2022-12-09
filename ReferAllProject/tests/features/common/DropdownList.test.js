import React from 'react';
import { shallow } from 'enzyme';
import { DropdownList } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DropdownList />);
  expect(renderedComponent.find('.common-dropdown-list').length).toBe(1);
});
