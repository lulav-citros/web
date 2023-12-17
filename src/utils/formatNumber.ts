import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
    return numeral(number).format();
}

export function fCurrency(number: InputValue) {
    const format = number ? numeral(number).format('$0,0.00') : '';

    return result(format, '.00');
}

export function fPercent(number: InputValue) {
    const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

    return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
    const format = number ? numeral(number).format('0.00a') : '';

    return result(format, '.00');
}

export function fData(number: InputValue) {
    const format = number ? numeral(number).format('0.0 b') : '';

    return result(format, '.0');
}

export function fSize(number: InputValue) {

    let size = typeof number == 'number' ? number : parseInt(number as string);
    // Define the size units
    const units = ['B', 'KB', 'MB', 'GB'];

    // Iterate over the units until the size is smaller than 1024
    for (let i = 0; i < units.length; i++) {
        if (size < 1024 || i === units.length - 1) {
            // Return the formatted string with the size and unit

            console.log("fSize", number, `${size.toFixed(2)} ${units[i]}`);
            return `${size.toFixed(2)} ${units[i]}`;
        }
        size /= 1024;
    }
}

function result(format: string, key = '.00') {
    const isInteger = format.includes(key);

    return isInteger ? format.replace(key, '') : format;
}
