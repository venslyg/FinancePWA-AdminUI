// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { ILiabilityLog, NewLiabilityLog } from '../liability-log.model';



export type PartialUpdateLiabilityLog = Partial<ILiabilityLog> & Pick<ILiabilityLog, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends ILiabilityLog | NewLiabilityLog | PartialUpdateLiabilityLog> = Omit<T, 'startDate' | 'endDate' | 'createdDate' | 'lastModifiedDate'> & {
  
  startDate?: string | null;
  
  endDate?: string | null;
  
  createdDate?: string | null;
  
  lastModifiedDate?: string | null;
  
};

export type RestLiabilityLog = RestOf<ILiabilityLog>;
export type NewRestLiabilityLog = RestOf<NewLiabilityLog>;
export type PartialUpdateRestLiabilityLog = RestOf<PartialUpdateLiabilityLog>;

export type EntityResponseType = HttpResponse<ILiabilityLog>;
export type EntityArrayResponseType = HttpResponse<ILiabilityLog[]>;


@Injectable({ providedIn: 'root' })
export class LiabilityLogService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `//api/liability-logs`;

  create(payload: NewLiabilityLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestLiabilityLog>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: ILiabilityLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestLiabilityLog>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestLiabilityLog>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestLiabilityLog[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends ILiabilityLog | NewLiabilityLog | PartialUpdateLiabilityLog>(entity: T): RestOf<T> {
    const copy: any = { ...entity };
    
    if (dayjs.isDayjs(entity.startDate)) {
      copy.startDate = entity.startDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.endDate)) {
      copy.endDate = entity.endDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }
    
    return copy;
  }

  protected convertDateFromServer(restEntity: RestLiabilityLog): ILiabilityLog {
    const entity: any = { ...restEntity };
    
    if (entity.startDate) {
        entity.startDate = dayjs(entity.startDate);
    }
    
    if (entity.endDate) {
        entity.endDate = dayjs(entity.endDate);
    }
    
    if (entity.createdDate) {
        entity.createdDate = dayjs(entity.createdDate);
    }
    
    if (entity.lastModifiedDate) {
        entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }
    
    return entity;
  }
  
  protected convertResponseFromServer(res: HttpResponse<RestLiabilityLog>): HttpResponse<ILiabilityLog> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLiabilityLog[]>): HttpResponse<ILiabilityLog[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
