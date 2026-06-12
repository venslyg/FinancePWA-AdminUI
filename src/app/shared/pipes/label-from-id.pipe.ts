import { Pipe, PipeTransform, inject } from '@angular/core';
import { LabelLookupService } from '../label-lookup.service';

@Pipe({
    name: 'labelFromId',
    standalone: true,
})
export class LabelFromIdPipe implements PipeTransform {
    private readonly lookup = inject(LabelLookupService);

    transform(
        id: number | string | null | undefined,
        list: Array<{ id?: number | string; label?: string }> | null | undefined,
        fallback?: string
    ): string {
        return this.lookup.labelFromId(id, list, fallback);
    }
}
