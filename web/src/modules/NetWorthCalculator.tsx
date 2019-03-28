import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import Select from 'react-select';
import HttpManager from "./HttpManager";
import NetWorthRecord from "../models/NetWorth";
import FinancialRecord, { RecordType } from "../models/FinancialRecord";
import FinancialRecordRow from "./components/FinancialRecordRow";
import CurrencyResult from "../models/CurrencyResult";
import { formatNumber } from "../utils/helperFunctions";
import NetWorthTotal from "../models/NetWorthTotal";

export interface INetWorthCalculatorState {
    selectedCurrency: any,
    netWorthTotal: number,
    totalAssets: number,
    totalLiabilities: number,
    entries: FinancialRecord[] | null,
    recordId: string,
    initialized: boolean
}



class NetWorthCalculator extends Component <{}, INetWorthCalculatorState> {

    currencies: any | undefined;
    httpManager: HttpManager;
    
    constructor(props: any) {
        super(props);
        this.httpManager = new HttpManager();
        const netWorthRecord = new NetWorthRecord();

        this.state = {
            recordId: netWorthRecord.recordId,
            selectedCurrency: null,
            netWorthTotal: 0,
            totalAssets: 0,
            totalLiabilities: 0,
            entries: netWorthRecord.entries,
            initialized: false
        }

        this.httpManager.get('https://localhost:44321/api/main/getCurrencies')
            .then((currencies: string[]) => {
                this.currencies = currencies.map((x: string) => {return {value: x, label: x};});

                this.setState({selectedCurrency: this.currencies.find( (x:any) => x.label === 'CDN')});
                
                // compute initial net worth
                this.httpManager.post('https://localhost:44321/api/main/calculateNetWorth', netWorthRecord). then (response => {
                    this.setState({
                        netWorthTotal: response.totalNetWorth,
                        totalAssets: response.totalAssets,
                        totalLiabilities: response.totalLiabilities,
                        initialized: true
                    });
                    
                }).catch(error => console.log(error));


            }).catch(error => console.log(error));
    }


    onCurrencyChange = (object: any) => {
        this.setState({ selectedCurrency: object });
        const recordId = this.state.recordId;
        // async to server: currency change
        this.httpManager.get('https://localhost:44321/api/main/getValuesInCurrency?currency=' + object.value + '&recordId=' + recordId)
            .then((object: CurrencyResult) => {

                if(!object.netWorthTotals) {
                    throw 'networthtotals is required';
                }
                this.setState({
                    entries: object.entries as FinancialRecord[],
                    netWorthTotal: object.netWorthTotals.totalNetWorth as number,
                    totalAssets:  object.netWorthTotals.totalAssets as number,
                    totalLiabilities: object.netWorthTotals.totalLiabilities as number
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        let shortTermAssets: FinancialRecord[] = [];
        let shortTermLiabilities: FinancialRecord[] = [];
        let longTermAssets: FinancialRecord[] = [];
        let longTermLiabilities: FinancialRecord[] = [];
        if(this.state.entries) {
            shortTermAssets = this.state.entries.filter(x => x.recordType === RecordType.ShortTermAsset);
            shortTermLiabilities = this.state.entries.filter(x => x.recordType === RecordType.ShortTermLiability);
            longTermAssets = this.state.entries.filter(x => x.recordType === RecordType.LongTermAsset);
            longTermLiabilities = this.state.entries.filter(x => x.recordType === RecordType.LongTermLiability);
        }
        return (
            this.state.initialized &&  <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="h4">Tracking Your Net Worth</Typography>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item xs={2}>
                        {this.currencies && <Select
                            id="currencySelector"
                            classNamePrefix="currencyList"
                            placeholder="Select Currency"
                            value={this.state.selectedCurrency}
                            options={this.currencies}
                            onChange={this.onCurrencyChange}
                        />}
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item xs={1}>
                        <Typography variant="title">Net Worth</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {formatNumber(this.state.netWorthTotal, this.state.selectedCurrency.value)}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="title">Assets</Typography>
                </Grid>
                {shortTermAssets.map( (x,i) => 
                    <FinancialRecordRow key={i} 
                        showPayment={false} 
                        currency={this.state.selectedCurrency.value} 
                        financialRecord={x} 
                        onChange={(record)=>{console.log(record)}}/>)}

            </Grid>
        )
    }

  
}

export default NetWorthCalculator;