import React from 'react';
import { shallow } from 'enzyme';
import { SentReferral } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SentReferral />);
  expect(renderedComponent.find('.dashboard-sent-referral').length).toBe(1);
});
