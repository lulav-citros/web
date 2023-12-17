import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
}

// export function fDateTime1(date: InputValue, newFormat?: string) {
//   const fm = newFormat || 'yyyy MMM dd HH:MM:SS';

//   return date ? format(new Date(date), fm) : '';
// }

export function fDateTime(date: InputValue, newFormat?: string) {
    // const fm = newFormat || 'yyyy MMM dd HH:MM:SS';
    const fm = newFormat || 'yyyy MMM dd HH:mm:ss.SSS';

    return date ? format(new Date(date), fm) : '';
}

export function fDateTimeShort(date: InputValue, newFormat?: string) {
    // const fm = newFormat || 'yyyy MMM dd HH:MM:SS';
    const fm = newFormat || 'yyyy MMM dd HH:mm:ss';

    return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
        })
        : '';
}
