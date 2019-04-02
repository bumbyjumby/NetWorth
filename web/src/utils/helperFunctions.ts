export function formatNumber(number: number, currency: string) {
    const result = new Intl.NumberFormat('en-US', { style: 'currency', currencyDisplay: 'symbol', currency: currency }).format(number);
    return result;
}

export function currencyNumber(number: number){
    let str = number.toFixed(2)
}