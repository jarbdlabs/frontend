import React from 'react';
import { shallow } from 'enzyme';
import { Admin } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Admin />);
  expect(renderedComponent.find('.home-admin').length).toBe(1);
});
