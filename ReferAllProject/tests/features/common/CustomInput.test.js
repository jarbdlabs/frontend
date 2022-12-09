import React from 'react';
import { shallow } from 'enzyme';
import { CustomInput } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CustomInput />);
  expect(renderedComponent.find('.common-custom-input').length).toBe(1);
});
