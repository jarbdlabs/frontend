import React from 'react';
import { shallow } from 'enzyme';
import { FindSpecialty } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FindSpecialty />);
  expect(renderedComponent.find('.referral-find-specialty').length).toBe(1);
});
