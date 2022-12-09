import React from 'react';
import { shallow } from 'enzyme';
import { DatePickers } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DatePickers />);
  expect(renderedComponent.find('.common-date-pickers').length).toBe(1);
});
