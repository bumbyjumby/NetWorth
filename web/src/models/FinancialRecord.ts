export enum RecordType{
    ShortTermAsset,
    LongTermAsset,
    ShortTermLiability,
    LongTermLiability
}

export default class FinancialRecord{
    id: number | undefined;
    value: number | undefined;
    // currency: string | undefined;
    name: string | undefined;
    rate: number | undefined;
    monthlyPayment: number | undefined;
    recordType: RecordType | undefined;
}