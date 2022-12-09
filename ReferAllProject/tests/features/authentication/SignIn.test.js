import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../../src/features/authentication';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SignIn />);
  expect(renderedComponent.find('.authentication-sign-in').length).toBe(1);
});
