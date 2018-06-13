import React from 'react';
import { shallow } from 'enzyme';
import { CategoryDivider, SectionDivider } from '../../app/components';

const defaultPropsCategory = {
  iconName: 'search',
  title: 'Title example',
  onPress: () => console.log('Press'),
};

const defaultPropsSection = {
  text: 'Default text',
};

describe('<CategoryDivider />', () => {
  it('should render the CategoryDivider component', () => {
    const wrapper = shallow(
      <CategoryDivider
        {...defaultPropsCategory}
      />
    );
    expect(wrapper.prop('title')).toEqual('Title example');
    expect(wrapper.prop('iconName')).toEqual('search');
    expect(wrapper).toMatchSnapshot();
  });

});


describe('<SectionDivider />', () => {
  it('should render the SectionDivider component', () => {
    const wrapper = shallow(
      <SectionDivider
        {...defaultPropsSection}
      />
    );
    expect(wrapper.prop('text')).toEqual('Default text');
    expect(wrapper).toMatchSnapshot();
  });

});
