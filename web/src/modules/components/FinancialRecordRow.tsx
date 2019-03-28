import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import FinancialRecord from "../../models/FinancialRecord";
import { formatNumber } from "../../utils/helperFunctions";
export interface IFinancialRecordRowProps {
    currency: string;
    financialRecord: FinancialRecord,
    onChange: (financialRecord: FinancialRecord) => void,
    showPayment: boolean
}
export default class FinancialRecordRow extends Component<IFinancialRecordRowProps>{

    render() {
        const { financialRecord, onChange, currency } = this.props;
        return (
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={8}>{financialRecord.name}</Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Rate"
                            value={financialRecord.rate}
                            onChange={(event) => {financialRecord.rate = parseFloat(event.target.value); onChange(financialRecord)}}
                            margin="normal"
                        /></Grid>
                    <Grid item xs={2}><TextField
                            label="Amount"
                            value={formatNumber(financialRecord.value as number, currency)}
                            onChange={(event) => {financialRecord.value = parseFloat(event.target.value); onChange(financialRecord)}}
                            margin="normal"
                        /></Grid>
                </Grid>
            </Grid>
        )
    }
}