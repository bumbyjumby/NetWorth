import React, { Component } from "react";
import { Grid, TextField, Input, Typography, InputAdornment } from "@material-ui/core";
import FinancialRecord from "../../models/FinancialRecord";
export interface IFinancialRecordRowProps {
    currencySymbol: string;
    financialRecord: FinancialRecord,
    onChange: (financialRecord: FinancialRecord) => void,
    showPayment: boolean
}
export default class FinancialRecordRow extends Component<IFinancialRecordRowProps>{

    render() {
        const { financialRecord, onChange, currencySymbol } = this.props;
        return (
            <Grid item xs={12}>
                <Grid container spacing={16}>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1">
                            {financialRecord.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            value={financialRecord.rate}
                            onChange={(event) => { financialRecord.rate = parseFloat(event.target.value); onChange(financialRecord) }}
                        /></Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={financialRecord.value as number}
                            onChange={(event) => { financialRecord.value = parseFloat(event.target.value); onChange(financialRecord) }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                              }}
                        />
                    </Grid>
                </Grid> 
            </Grid>
        )
    }
}