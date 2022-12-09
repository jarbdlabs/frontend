import React from 'react';
import { shallow } from 'enzyme';
import { UsersPage } from '../../../src/features/users';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UsersPage />);
  expect(renderedComponent.find('.users-users-page').length).toBe(1);
});
