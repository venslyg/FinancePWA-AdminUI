import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LabelLookupService {
    /**
     * Return a label for the given id from a provided list synchronously.
     * If not found, returns a friendly fallback.
     */
    labelFromId(
        id: number | string | null | undefined,
        list: Array<{ id?: number | string; label?: string }> | null | undefined,
        fallback?: string
    ): string {
        if (id === null || id === undefined) {
            return '-';
        }
        const idStr = id.toString();
        const found = list?.find((item) => item.id !== undefined && item.id !== null && item.id.toString() === idStr);
        if (found?.label) {
            return found.label;
        }
        return fallback ?? `#${id}`;
    }
}
