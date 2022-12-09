import React from 'react';
import { shallow } from 'enzyme';
import { ClinicsPage } from '../../../src/features/clinics';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ClinicsPage />);
  expect(renderedComponent.find('.clinics-clinics-page').length).toBe(1);
});
