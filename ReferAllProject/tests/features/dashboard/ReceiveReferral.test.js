import React from 'react';
import { shallow } from 'enzyme';
import { ReceiveReferral } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ReceiveReferral />);
  expect(renderedComponent.find('.dashboard-receive-referral').length).toBe(1);
});
