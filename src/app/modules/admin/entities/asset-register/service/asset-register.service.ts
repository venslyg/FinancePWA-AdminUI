// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IAssetRegister, NewAssetRegister } from '../asset-register.model';



export type PartialUpdateAssetRegister = Partial<IAssetRegister> & Pick<IAssetRegister, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IAssetRegister | NewAssetRegister | PartialUpdateAssetRegister> = Omit<T, 'purchaseDate' | 'createdDate' | 'lastModifiedDate'> & {

  purchaseDate?: string | null;

  createdDate?: string | null;

  lastModifiedDate?: string | null;

};

export type RestAssetRegister = RestOf<IAssetRegister>;
export type NewRestAssetRegister = RestOf<NewAssetRegister>;
export type PartialUpdateRestAssetRegister = RestOf<PartialUpdateAssetRegister>;

export type EntityResponseType = HttpResponse<IAssetRegister>;
export type EntityArrayResponseType = HttpResponse<IAssetRegister[]>;


@Injectable({ providedIn: 'root' })
export class AssetRegisterService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `/api/asset-registers`;

  create(payload: NewAssetRegister): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestAssetRegister>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IAssetRegister): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestAssetRegister>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestAssetRegister>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestAssetRegister[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IAssetRegister | NewAssetRegister | PartialUpdateAssetRegister>(entity: T): RestOf<T> {
    const copy: any = { ...entity };

    if (dayjs.isDayjs(entity.purchaseDate)) {
      copy.purchaseDate = entity.purchaseDate.toJSON();
    }

    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }

    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }

    return copy;
  }

  protected convertDateFromServer(restEntity: RestAssetRegister): IAssetRegister {
    const entity: any = { ...restEntity };

    if (entity.purchaseDate) {
      entity.purchaseDate = dayjs(entity.purchaseDate);
    }

    if (entity.createdDate) {
      entity.createdDate = dayjs(entity.createdDate);
    }

    if (entity.lastModifiedDate) {
      entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }

    return entity;
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssetRegister>): HttpResponse<IAssetRegister> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssetRegister[]>): HttpResponse<IAssetRegister[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
