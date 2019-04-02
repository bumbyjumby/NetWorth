import React from 'react';
import ReactDOM from 'react-dom';

import FinancialRecordRow from './FinancialRecordRow';
import { shallow, render, mount } from 'enzyme';
import Select from 'react-select/lib/Select';
import renderer from 'react-test-renderer';
import FinancialRecord, { RecordType } from '../../models/FinancialRecord';

const financialRecord: FinancialRecord = {
    id:0,
    monthlyPayment:100,
    name:'stuff',
    rate:0.5,
    recordType: RecordType.ShortTermAsset,
    value:1000
}
function onChange(){}

it('renders correctly and creates a snapshot', () => {
    const tree = renderer.create(<FinancialRecordRow showPayment={true}
        currency={'CDN'}
        financialRecord={financialRecord}
        onChange={onChange} />).toJSON();
    expect(tree).toMatchSnapshot();
    
});