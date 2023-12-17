import { ExportMap } from '@jupyter-widgets/base/lib/registry';

export function getImportExportMap(importMap: object): ExportMap {
    return Object.keys(importMap)
        .filter((value) => value.includes('Model') || value.includes('View'))
        .reduce((previousValue, currentValue) => {
            // @ts-ignore
            previousValue[currentValue] = importMap[currentValue];
            return previousValue;
        }, {});
}
