import React from 'react';
import { shallow } from 'enzyme';
import { CompletedPage } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CompletedPage />);
  expect(renderedComponent.find('.referral-completed-page').length).toBe(1);
});
