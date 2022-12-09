import React from 'react';
import { shallow } from 'enzyme';
import { PdfReader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PdfReader />);
  expect(renderedComponent.find('.common-pdf-reader').length).toBe(1);
});
