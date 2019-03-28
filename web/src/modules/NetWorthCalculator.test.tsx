import React from 'react';
import ReactDOM from 'react-dom';

import NetWorthCalculator from './NetWorthCalculator';
import { shallow, render, mount } from 'enzyme';
import Select from 'react-select/lib/Select';

it('renders NetWorthCalculator without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NetWorthCalculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders NetWorthCalculator without crashing using enzyme', () => {
    shallow(<NetWorthCalculator />);
  });

it('sets currency state when dropdown changes', () => {
    const wrapper = mount(<NetWorthCalculator />);

    const reactSelect = wrapper.find(Select);
    expect(reactSelect).toBeDefined;
    reactSelect.props().onChange({value:'CDN', label:'CDN'});
    
    expect(wrapper.state('currency')).toBeTruthy;
    expect(wrapper.state('currency')).toEqual('CDN');
    
})