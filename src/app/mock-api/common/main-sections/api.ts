import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { mainSections } from './data';

@Injectable({ providedIn: 'root' })
export class MainSectionsMockApi {

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._fuseMockApiService.onGet('api/main-sections').reply(() => {
            return [200, mainSections];
        });
    }
}