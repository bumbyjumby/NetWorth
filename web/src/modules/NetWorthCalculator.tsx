import React, { Component } from "react";
import { Grid, Typography, TextField, InputAdornment } from '@material-ui/core';
import Select from 'react-select';
import HttpManager from "./HttpManager";
import NetWorthRecord from "../models/NetWorth";
import FinancialRecord, { RecordType } from "../models/FinancialRecord";
import FinancialRecordRow from "./components/FinancialRecordRow";
import CurrencyResult from "../models/CurrencyResult";

export interface INetWorthCalculatorState {
    selectedCurrency: any,
    currencySymbol: string,
    netWorthTotal: number,
    totalAssets: number,
    totalLiabilities: number,
    entries: FinancialRecord[] | null,
    recordId: string,
    initialized: boolean
}

const apiUrl = 'https://localhost:44321/api/main/';


class NetWorthCalculator extends Component<{}, INetWorthCalculatorState> {

    currencies: any | undefined;
    httpManager: HttpManager;

    constructor(props: any) {
        super(props);
        this.httpManager = new HttpManager();
        const netWorthRecord = new NetWorthRecord();

        this.state = {
            recordId: netWorthRecord.recordId,
            selectedCurrency: null,
            currencySymbol: 'CDN',
            netWorthTotal: 0,
            totalAssets: 0,
            totalLiabilities: 0,
            entries: netWorthRecord.entries,
            initialized: false
        }

        this.httpManager.get(apiUrl + 'getCurrencies')
            .then((currencies: string[]) => {
                this.currencies = currencies.map((x: string) => { return { value: x, label: x }; });

                this.setState({ selectedCurrency: this.currencies.find((x: any) => x.label === 'CDN') });
                // compute initial net worth
                this.httpManager.post(apiUrl + 'calculateNetWorth', netWorthRecord).then(response => {
                    this.setState({
                        netWorthTotal: response.totalNetWorth,
                        totalAssets: response.totalAssets,
                        totalLiabilities: response.totalLiabilities,
                        initialized: true
                    });
                }).catch(error => console.log(error));


            }).catch(error => console.log(error));
    }

    onFieldChange = (event: any) => {
        const netWorthRecord: NetWorthRecord = {
            currency: this.state.selectedCurrency.value,
            recordId: this.state.recordId,
            entries: this.state.entries as FinancialRecord[]
        }

        this.httpManager.post(apiUrl + 'calculateNetWorth', netWorthRecord).then(response => {
            this.setState({
                netWorthTotal: response.totalNetWorth,
                totalAssets: response.totalAssets,
                totalLiabilities: response.totalLiabilities
            });

        }).catch(error => console.log(error));
    }

    onCurrencyChange = (object: any) => {
 
        
        const recordId = this.state.recordId;

        const parts = new Intl.NumberFormat('en-US', { style: 'currency', currencyDisplay: 'symbol', currency: object.value }).formatToParts(0);
        this.setState({ selectedCurrency: object, currencySymbol: parts[0].value });

        // async to server: currency change
        this.httpManager.get(apiUrl + 'getValuesInCurrency?currency=' + object.value + '&recordId=' + recordId)
            .then((object: CurrencyResult) => {

                if (!object.netWorthTotals) {
                    throw 'networthtotals is required';
                }
                this.setState({
                    entries: object.entries as FinancialRecord[],
                    netWorthTotal: object.netWorthTotals.totalNetWorth as number,
                    totalAssets: object.netWorthTotals.totalAssets as number,
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
        if (this.state.entries) {
            shortTermAssets = this.state.entries.filter(x => x.recordType === RecordType.ShortTermAsset);
            shortTermLiabilities = this.state.entries.filter(x => x.recordType === RecordType.ShortTermLiability);
            longTermAssets = this.state.entries.filter(x => x.recordType === RecordType.LongTermAsset);
            longTermLiabilities = this.state.entries.filter(x => x.recordType === RecordType.LongTermLiability);
        }
        return (
            this.state.initialized && <Grid container spacing={16} justify="center">
                <Grid item xs={6}>

                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Tracking Your Net Worth</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xs={10} />
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
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xs={7} />
                                <Grid item xs={2}>
                                    <Typography variant="h6">Net Worth</Typography>
                                </Grid>
                                <Grid item xs={3} style={{textAlign: "right"}}>                            
                                    <Typography variant="h6"> {`${this.state.currencySymbol} ${this.state.netWorthTotal.toFixed(2)}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Assets</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xs={8}>
                                    <Typography variant="title">Cash and Investments</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="title">Rate</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="title">Amount</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {shortTermAssets.map((x, i) =>
                            <FinancialRecordRow key={i}
                                showPayment={false}
                                currencySymbol={this.state.currencySymbol}
                                financialRecord={x}
                                onChange={this.onFieldChange} />)}
                        <Grid item xs={12}>
                            <Typography variant="title">Long Term Assets</Typography>
                        </Grid>
                        {longTermAssets.map((x, i) =>
                            <FinancialRecordRow key={i}
                                showPayment={false}
                                currencySymbol={this.state.currencySymbol}
                                financialRecord={x}
                                onChange={this.onFieldChange} />)}
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xs={2}>
                                    <Typography variant="title">Total Assets</Typography>
                                </Grid>
                                <Grid item xs={7} />
                                <Grid item xs={3} style={{textAlign: "right"}}>
                                    <Typography variant="h6">{`${this.state.currencySymbol} ${this.state.totalAssets.toFixed(2)}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Liabilities</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Short Term Liabilities</Typography>
                        </Grid>
                        {shortTermLiabilities.map((x, i) =>
                            <FinancialRecordRow key={i}
                                showPayment={true}
                                currencySymbol={this.state.currencySymbol}
                                financialRecord={x}
                                onChange={this.onFieldChange} />)}
                        <Grid item xs={12}>
                            <Typography variant="title">Long Term Debt</Typography>
                        </Grid>
                        {longTermLiabilities.map((x, i) =>
                            <FinancialRecordRow key={i}
                                showPayment={true}
                                currencySymbol={this.state.currencySymbol}
                                financialRecord={x}
                                onChange={this.onFieldChange} />)}
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xs={2}>
                                    <Typography variant="title">Total Liabilities</Typography>
                                </Grid>
                                <Grid item xs={7} />
                                <Grid item xs={3} style={{textAlign: "right"}}>
                                    <Typography variant="h6">{`${this.state.currencySymbol} ${this.state.totalLiabilities.toFixed(2)}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }


}

export default NetWorthCalculator;