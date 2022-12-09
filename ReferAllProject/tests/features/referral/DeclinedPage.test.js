import React from 'react';
import { shallow } from 'enzyme';
import { DeclinedPage } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DeclinedPage />);
  expect(renderedComponent.find('.referral-declined-page').length).toBe(1);
});
