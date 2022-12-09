import React from 'react';
import { shallow } from 'enzyme';
import { ReviewReferral } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ReviewReferral />);
  expect(renderedComponent.find('.referral-review-referral').length).toBe(1);
});
