import React from 'react';
import { shallow } from 'enzyme';
import { AddUser } from '../../../src/features/users';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddUser />);
  expect(renderedComponent.find('.users-add-user').length).toBe(1);
});
