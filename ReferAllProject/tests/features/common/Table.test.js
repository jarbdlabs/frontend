import React from 'react';
import { shallow } from 'enzyme';
import { Table } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Table />);
  expect(renderedComponent.find('.common-table').length).toBe(1);
});
