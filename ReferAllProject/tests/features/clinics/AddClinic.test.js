import React from 'react';
import { shallow } from 'enzyme';
import { AddClinic } from '../../../src/features/clinics';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddClinic />);
  expect(renderedComponent.find('.clinics-add-clinic').length).toBe(1);
});
