// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IPettyCashLedger, NewPettyCashLedger } from '../petty-cash-ledger.model';



export type PartialUpdatePettyCashLedger = Partial<IPettyCashLedger> & Pick<IPettyCashLedger, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IPettyCashLedger | NewPettyCashLedger | PartialUpdatePettyCashLedger> = Omit<T, 'date' | 'createdDate' | 'lastModifiedDate'> & {
  
  date?: string | null;
  
  createdDate?: string | null;
  
  lastModifiedDate?: string | null;
  
};

export type RestPettyCashLedger = RestOf<IPettyCashLedger>;
export type NewRestPettyCashLedger = RestOf<NewPettyCashLedger>;
export type PartialUpdateRestPettyCashLedger = RestOf<PartialUpdatePettyCashLedger>;

export type EntityResponseType = HttpResponse<IPettyCashLedger>;
export type EntityArrayResponseType = HttpResponse<IPettyCashLedger[]>;


@Injectable({ providedIn: 'root' })
export class PettyCashLedgerService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `//api/petty-cash-ledgers`;

  create(payload: NewPettyCashLedger): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestPettyCashLedger>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IPettyCashLedger): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestPettyCashLedger>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestPettyCashLedger>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestPettyCashLedger[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IPettyCashLedger | NewPettyCashLedger | PartialUpdatePettyCashLedger>(entity: T): RestOf<T> {
    const copy: any = { ...entity };
    
    if (dayjs.isDayjs(entity.date)) {
      copy.date = entity.date.toJSON();
    }
    
    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }
    
    return copy;
  }

  protected convertDateFromServer(restEntity: RestPettyCashLedger): IPettyCashLedger {
    const entity: any = { ...restEntity };
    
    if (entity.date) {
        entity.date = dayjs(entity.date);
    }
    
    if (entity.createdDate) {
        entity.createdDate = dayjs(entity.createdDate);
    }
    
    if (entity.lastModifiedDate) {
        entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }
    
    return entity;
  }
  
  protected convertResponseFromServer(res: HttpResponse<RestPettyCashLedger>): HttpResponse<IPettyCashLedger> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPettyCashLedger[]>): HttpResponse<IPettyCashLedger[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
