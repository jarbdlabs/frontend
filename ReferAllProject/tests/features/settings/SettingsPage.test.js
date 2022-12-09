import React from 'react';
import { shallow } from 'enzyme';
import { SettingsPage } from '../../../src/features/settings';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SettingsPage />);
  expect(renderedComponent.find('.settings-settings-page').length).toBe(1);
});
