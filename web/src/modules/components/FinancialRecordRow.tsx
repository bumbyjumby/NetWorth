import React, { Component } from "react";
import { Grid, TextField, Input, Typography } from "@material-ui/core";
import FinancialRecord from "../../models/FinancialRecord";
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
                <Grid container spacing={16}>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1">
                            {financialRecord.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            // label="Rate"
                            // margin={"dense"}
                            value={financialRecord.rate}
                            onChange={(event) => { financialRecord.rate = parseFloat(event.target.value); onChange(financialRecord) }}
                        /></Grid>
                    <Grid item xs={2}><Input
                        // label="Amount"
                        // margin={"dense"}
                        value={(financialRecord.value as number).toFixed(2)}
                        onChange={(event) => { financialRecord.value = parseFloat(event.target.value); onChange(financialRecord) }}
                    /></Grid>
                </Grid>
            </Grid>
        )
    }
}