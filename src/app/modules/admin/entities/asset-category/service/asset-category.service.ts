// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IAssetCategory, NewAssetCategory } from '../asset-category.model';



export type PartialUpdateAssetCategory = Partial<IAssetCategory> & Pick<IAssetCategory, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IAssetCategory | NewAssetCategory | PartialUpdateAssetCategory> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  
  createdDate?: string | null;
  
  lastModifiedDate?: string | null;
  
};

export type RestAssetCategory = RestOf<IAssetCategory>;
export type NewRestAssetCategory = RestOf<NewAssetCategory>;
export type PartialUpdateRestAssetCategory = RestOf<PartialUpdateAssetCategory>;

export type EntityResponseType = HttpResponse<IAssetCategory>;
export type EntityArrayResponseType = HttpResponse<IAssetCategory[]>;


@Injectable({ providedIn: 'root' })
export class AssetCategoryService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `//api/asset-categorys`;

  create(payload: NewAssetCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestAssetCategory>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IAssetCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestAssetCategory>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestAssetCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestAssetCategory[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IAssetCategory | NewAssetCategory | PartialUpdateAssetCategory>(entity: T): RestOf<T> {
    const copy: any = { ...entity };
    
    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }
    
    return copy;
  }

  protected convertDateFromServer(restEntity: RestAssetCategory): IAssetCategory {
    const entity: any = { ...restEntity };
    
    if (entity.createdDate) {
        entity.createdDate = dayjs(entity.createdDate);
    }
    
    if (entity.lastModifiedDate) {
        entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }
    
    return entity;
  }
  
  protected convertResponseFromServer(res: HttpResponse<RestAssetCategory>): HttpResponse<IAssetCategory> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssetCategory[]>): HttpResponse<IAssetCategory[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
