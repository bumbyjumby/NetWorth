import FinancialRecord, { RecordType } from "./FinancialRecord";



export default class NetWorthRecord{
    currency: string = 'CDN';
    recordId: string ='theRecord';
    entries: FinancialRecord[]=[
        // short term assets
        {name:'Chequing', id:1, rate: 0, recordType: RecordType.ShortTermAsset, value:2000, monthlyPayment:0},
        {name:'Savings for Taxes', id:2, rate: 5, recordType: RecordType.ShortTermAsset, value:4000, monthlyPayment:0},
        {name:'Rainy Day Fund', id:3, rate: 0, recordType: RecordType.ShortTermAsset, value:506, monthlyPayment:0},
        {name:'Savings for Fun', id:4, rate: 0, recordType: RecordType.ShortTermAsset, value:5000, monthlyPayment:0},
        {name:'Savings for Travel', id:5, rate: 0, recordType: RecordType.ShortTermAsset, value:400, monthlyPayment:0},
        {name:'Savings for Personal Development', id:6, rate: 1.5, recordType: RecordType.ShortTermAsset, value:200, monthlyPayment:0},
        {name:'Investment 1', id:7, rate: 2.3, recordType: RecordType.ShortTermAsset, value:5000, monthlyPayment:0},
        {name:'Investment 2', id:8, rate: 2, recordType: RecordType.ShortTermAsset, value:60000, monthlyPayment:0},
        {name:'Investment 3', id:9, rate: 5, recordType: RecordType.ShortTermAsset, value:30000, monthlyPayment:0},
        {name:'Investment 4', id:10, rate: 10, recordType: RecordType.ShortTermAsset, value:50000, monthlyPayment:0},
        {name:'Investment 5', id:11, rate: 6, recordType: RecordType.ShortTermAsset, value:24000, monthlyPayment:0},

        // long term assets
        {name:'Primary Home', id:12, rate: 1, recordType: RecordType.LongTermAsset, value:455000, monthlyPayment:0},
        {name:'Second Home', id:13, rate: 2, recordType: RecordType.LongTermAsset, value:1564321, monthlyPayment:0},

        // short term liabilities
        {name:'Credit Card 1', id:14, rate: 50, recordType: RecordType.ShortTermLiability, value:43342, monthlyPayment:200},
        {name:'Credit Card 2', id:15, rate: 22, recordType: RecordType.ShortTermLiability, value:322, monthlyPayment:150},

        // long term liabilities
        {name:'Mortgage 1', id:16, rate: 2.6, recordType: RecordType.LongTermLiability, value:250999, monthlyPayment:2000},
        {name:'Mortgage 2', id:17, rate: 5.4, recordType: RecordType.LongTermLiability, value:632634, monthlyPayment:3500},
        {name:'Line of Credit', id:18, rate: 5, recordType: RecordType.LongTermLiability, value:10000, monthlyPayment:500},
        {name:'Investment Loan', id:19, rate: 6, recordType: RecordType.LongTermLiability, value:10000, monthlyPayment:700},
    ];
}

