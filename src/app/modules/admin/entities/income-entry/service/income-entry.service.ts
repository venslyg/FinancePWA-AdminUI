// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IIncomeEntry, NewIncomeEntry } from '../income-entry.model';



export type PartialUpdateIncomeEntry = Partial<IIncomeEntry> & Pick<IIncomeEntry, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IIncomeEntry | NewIncomeEntry | PartialUpdateIncomeEntry> = Omit<T, 'date' | 'createdDate' | 'lastModifiedDate'> & {

  date?: string | null;

  createdDate?: string | null;

  lastModifiedDate?: string | null;

};

export type RestIncomeEntry = RestOf<IIncomeEntry>;
export type NewRestIncomeEntry = RestOf<NewIncomeEntry>;
export type PartialUpdateRestIncomeEntry = RestOf<PartialUpdateIncomeEntry>;

export type EntityResponseType = HttpResponse<IIncomeEntry>;
export type EntityArrayResponseType = HttpResponse<IIncomeEntry[]>;


@Injectable({ providedIn: 'root' })
export class IncomeEntryService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `/api/income-entrys`;

  create(payload: NewIncomeEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestIncomeEntry>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IIncomeEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestIncomeEntry>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestIncomeEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestIncomeEntry[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IIncomeEntry | NewIncomeEntry | PartialUpdateIncomeEntry>(entity: T): RestOf<T> {
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

  protected convertDateFromServer(restEntity: RestIncomeEntry): IIncomeEntry {
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

  protected convertResponseFromServer(res: HttpResponse<RestIncomeEntry>): HttpResponse<IIncomeEntry> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestIncomeEntry[]>): HttpResponse<IIncomeEntry[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
