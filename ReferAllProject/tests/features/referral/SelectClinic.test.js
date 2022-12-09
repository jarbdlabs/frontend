import React from 'react';
import { shallow } from 'enzyme';
import { SelectClinic } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SelectClinic />);
  expect(renderedComponent.find('.referral-select-clinic').length).toBe(1);
});
