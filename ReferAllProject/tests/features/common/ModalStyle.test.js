import React from 'react';
import { shallow } from 'enzyme';
import { ModalStyle } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ModalStyle />);
  expect(renderedComponent.find('.common-modal-style').length).toBe(1);
});
