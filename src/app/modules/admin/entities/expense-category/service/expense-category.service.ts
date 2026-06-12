// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IExpenseCategory, NewExpenseCategory } from '../expense-category.model';



export type PartialUpdateExpenseCategory = Partial<IExpenseCategory> & Pick<IExpenseCategory, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IExpenseCategory | NewExpenseCategory | PartialUpdateExpenseCategory> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {

  createdDate?: string | null;

  lastModifiedDate?: string | null;

};

export type RestExpenseCategory = RestOf<IExpenseCategory>;
export type NewRestExpenseCategory = RestOf<NewExpenseCategory>;
export type PartialUpdateRestExpenseCategory = RestOf<PartialUpdateExpenseCategory>;

export type EntityResponseType = HttpResponse<IExpenseCategory>;
export type EntityArrayResponseType = HttpResponse<IExpenseCategory[]>;


@Injectable({ providedIn: 'root' })
export class ExpenseCategoryService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `/api/expense-categorys`;

  create(payload: NewExpenseCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestExpenseCategory>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IExpenseCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestExpenseCategory>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestExpenseCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestExpenseCategory[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IExpenseCategory | NewExpenseCategory | PartialUpdateExpenseCategory>(entity: T): RestOf<T> {
    const copy: any = { ...entity };

    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }

    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }

    return copy;
  }

  protected convertDateFromServer(restEntity: RestExpenseCategory): IExpenseCategory {
    const entity: any = { ...restEntity };

    if (entity.createdDate) {
      entity.createdDate = dayjs(entity.createdDate);
    }

    if (entity.lastModifiedDate) {
      entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }

    return entity;
  }

  protected convertResponseFromServer(res: HttpResponse<RestExpenseCategory>): HttpResponse<IExpenseCategory> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestExpenseCategory[]>): HttpResponse<IExpenseCategory[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
