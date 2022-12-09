import React from 'react';
import { shallow } from 'enzyme';
import { TabPanel } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TabPanel />);
  expect(renderedComponent.find('.common-tab-panel').length).toBe(1);
});
