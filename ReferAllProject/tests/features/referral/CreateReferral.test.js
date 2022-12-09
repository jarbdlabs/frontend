import React from 'react';
import { shallow } from 'enzyme';
import { CreateReferral } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CreateReferral />);
  expect(renderedComponent.find('.referral-create-referral').length).toBe(1);
});
