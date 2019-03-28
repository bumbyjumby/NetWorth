export function formatNumber(number: number, currency: string) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currencyDisplay: 'symbol', currency: currency }).format(number);
}