import React from 'react';
import ReactDOM from 'react-dom';

import NetWorthCalculator from './NetWorthCalculator';
import { shallow, render, mount } from 'enzyme';
import Select from 'react-select/lib/Select';
import renderer from 'react-test-renderer';
import FinancialRecordRow from './components/FinancialRecordRow';

jest.mock('./HttpManager');

it('renders correctly and creates a snapshot', () => {
    const tree = renderer.create(<NetWorthCalculator />).toJSON();
    expect(tree).toMatchSnapshot();

});
it('renders NetWorthCalculator without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NetWorthCalculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders NetWorthCalculator without crashing using enzyme', () => {
    shallow(<NetWorthCalculator />);
  });

it('sets currency state when dropdown changes', async () => {
    const wrapper = shallow(<NetWorthCalculator />);

    if(wrapper.instance()){
        await wrapper.instance().render();
    }
    const financialRecords = wrapper.children().find(FinancialRecordRow);

   
    const reactSelect = wrapper.find(Select);
    expect(reactSelect).not.toBeNull;
    expect(reactSelect).toBeDefined;

    reactSelect.props().onChange({value:'CDN', label:'CDN'});w
    
    expect(wrapper.state('currency')).toBeTruthy;
    expect(wrapper.state('currency')).toEqual('CDN');
    
})


