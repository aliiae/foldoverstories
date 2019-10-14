import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../_integrationTests/utils';
import ShareButtons from './ShareButtons';

describe('ShareButtons Component', () => {
  describe('Renders', () => {
    let wrapper;
    beforeEach(() => {
      const props = { url: 'test-url' };
      wrapper = shallow(<ShareButtons {...props} />);
    });
    it('should render a button panel', () => {
      const button = findByTestAttr(wrapper, 'share-buttons');
      expect(button.length).toBe(1);
    });
  });
});
