import React from 'react';
import { shallow } from 'enzyme';
import { PatientDemographics } from '../../../src/features/referral';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PatientDemographics />);
  expect(renderedComponent.find('.referral-patient-demographics').length).toBe(1);
});
