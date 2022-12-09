import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DashboardPage />);
  expect(renderedComponent.find('.dashboard-dashboard').length).toBe(1);
});
