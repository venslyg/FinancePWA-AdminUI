// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IAssetDepreciationHistory, NewAssetDepreciationHistory } from '../asset-depreciation-history.model';



export type PartialUpdateAssetDepreciationHistory = Partial<IAssetDepreciationHistory> & Pick<IAssetDepreciationHistory, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IAssetDepreciationHistory | NewAssetDepreciationHistory | PartialUpdateAssetDepreciationHistory> = Omit<T, 'depreciationDate' | 'createdDate' | 'lastModifiedDate'> & {

  depreciationDate?: string | null;

  createdDate?: string | null;

  lastModifiedDate?: string | null;

};

export type RestAssetDepreciationHistory = RestOf<IAssetDepreciationHistory>;
export type NewRestAssetDepreciationHistory = RestOf<NewAssetDepreciationHistory>;
export type PartialUpdateRestAssetDepreciationHistory = RestOf<PartialUpdateAssetDepreciationHistory>;

export type EntityResponseType = HttpResponse<IAssetDepreciationHistory>;
export type EntityArrayResponseType = HttpResponse<IAssetDepreciationHistory[]>;


@Injectable({ providedIn: 'root' })
export class AssetDepreciationHistoryService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `/api/asset-depreciation-histories`;

  create(payload: NewAssetDepreciationHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestAssetDepreciationHistory>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IAssetDepreciationHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestAssetDepreciationHistory>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestAssetDepreciationHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestAssetDepreciationHistory[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected createRequestOption(req?: any): HttpParams {
    let options: HttpParams = new HttpParams();
    if (req) {
      Object.keys(req).forEach(key => {
        if (req[key] !== null && req[key] !== undefined) {
          options = options.set(key, req[key]);
        }
      });
    }
    return options;
  };

  // --- Date Conversion Helpers ---
  protected convertDateFromClient<T extends IAssetDepreciationHistory | NewAssetDepreciationHistory | PartialUpdateAssetDepreciationHistory>(entity: T): RestOf<T> {
    const copy: any = { ...entity };

    if (dayjs.isDayjs(entity.depreciationDate)) {
      copy.depreciationDate = entity.depreciationDate.toJSON();
    }

    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }

    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }

    return copy;
  }

  protected convertDateFromServer(restEntity: RestAssetDepreciationHistory): IAssetDepreciationHistory {
    const entity: any = { ...restEntity };

    if (entity.depreciationDate) {
      entity.depreciationDate = dayjs(entity.depreciationDate);
    }

    if (entity.createdDate) {
      entity.createdDate = dayjs(entity.createdDate);
    }

    if (entity.lastModifiedDate) {
      entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }

    return entity;
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssetDepreciationHistory>): HttpResponse<IAssetDepreciationHistory> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssetDepreciationHistory[]>): HttpResponse<IAssetDepreciationHistory[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
