import React from 'react';
import { shallow } from 'enzyme';
import { SendReferralPage } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SendReferralPage />);
  expect(renderedComponent.find('.referral-send-referral').length).toBe(1);
});
