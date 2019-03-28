import FinancialRecord from "./FinancialRecord";
import NetWorthTotal from "./NetWorthTotal";

export default class CurrencyResult {
    currency: string | undefined;
    recordId: string | undefined
    netWorthTotals: NetWorthTotal | undefined;
    entries: FinancialRecord[] | undefined;
}