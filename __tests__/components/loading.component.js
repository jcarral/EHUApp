import React from 'react';
import { shallow } from 'enzyme';
import { LoadingScreen } from '../../app/components';

describe('<LoadingScreen />', () => {
  it('should render the LoadingScreen', () => {
    const wrapper = shallow(
      <LoadingScreen />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
