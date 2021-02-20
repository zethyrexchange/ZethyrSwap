export function parseFloatNumber(value, decimals) {
    return parseFloat(value.toFixed(decimals));
} 
export function convertTokensToBigNumber(value, decimals) {
    return Math.floor(value * 10 ** decimals);
}