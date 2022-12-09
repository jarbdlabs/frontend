import React from 'react';
import { shallow } from 'enzyme';
import { ViewReferralNotes } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ViewReferralNotes />);
  expect(renderedComponent.find('.referral-view-referral-notes').length).toBe(1);
});
