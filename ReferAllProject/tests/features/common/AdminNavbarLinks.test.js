import React from 'react';
import { shallow } from 'enzyme';
import { AdminNavbarLinks } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AdminNavbarLinks />);
  expect(renderedComponent.find('.common-admin-navbar-links').length).toBe(1);
});
