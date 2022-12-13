import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveDialog } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveDialog />);
  expect(renderedComponent.find('.common-responsive-dialog').length).toBe(1);
});
