// This is an EJS template. It generates the main data service for the entity.
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { IMaintenanceLog, NewMaintenanceLog } from '../maintenance-log.model';



export type PartialUpdateMaintenanceLog = Partial<IMaintenanceLog> & Pick<IMaintenanceLog, 'id'>;

// --- Define REST-safe types by converting Dayjs objects to strings ---
type RestOf<T extends IMaintenanceLog | NewMaintenanceLog | PartialUpdateMaintenanceLog> = Omit<T, 'logDate' | 'nextServiceDate' | 'createdDate' | 'lastModifiedDate'> & {
  
  logDate?: string | null;
  
  nextServiceDate?: string | null;
  
  createdDate?: string | null;
  
  lastModifiedDate?: string | null;
  
};

export type RestMaintenanceLog = RestOf<IMaintenanceLog>;
export type NewRestMaintenanceLog = RestOf<NewMaintenanceLog>;
export type PartialUpdateRestMaintenanceLog = RestOf<PartialUpdateMaintenanceLog>;

export type EntityResponseType = HttpResponse<IMaintenanceLog>;
export type EntityArrayResponseType = HttpResponse<IMaintenanceLog[]>;


@Injectable({ providedIn: 'root' })
export class MaintenanceLogService {
  protected readonly http = inject(HttpClient);

  // FIX: Ensure the microservice name from the config is always lowercase in the URL.
  protected resourceUrl = `//api/maintenance-logs`;

  create(payload: NewMaintenanceLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.post<RestMaintenanceLog>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payload: IMaintenanceLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payload);
    return this.http.put<RestMaintenanceLog>(`${this.resourceUrl}/${payload.id}`, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RestMaintenanceLog>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.createRequestOption(req);
    return this.http.get<RestMaintenanceLog[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(map(res => this.convertResponseArrayFromServer(res)));
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
  protected convertDateFromClient<T extends IMaintenanceLog | NewMaintenanceLog | PartialUpdateMaintenanceLog>(entity: T): RestOf<T> {
    const copy: any = { ...entity };
    
    if (dayjs.isDayjs(entity.logDate)) {
      copy.logDate = entity.logDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.nextServiceDate)) {
      copy.nextServiceDate = entity.nextServiceDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.createdDate)) {
      copy.createdDate = entity.createdDate.toJSON();
    }
    
    if (dayjs.isDayjs(entity.lastModifiedDate)) {
      copy.lastModifiedDate = entity.lastModifiedDate.toJSON();
    }
    
    return copy;
  }

  protected convertDateFromServer(restEntity: RestMaintenanceLog): IMaintenanceLog {
    const entity: any = { ...restEntity };
    
    if (entity.logDate) {
        entity.logDate = dayjs(entity.logDate);
    }
    
    if (entity.nextServiceDate) {
        entity.nextServiceDate = dayjs(entity.nextServiceDate);
    }
    
    if (entity.createdDate) {
        entity.createdDate = dayjs(entity.createdDate);
    }
    
    if (entity.lastModifiedDate) {
        entity.lastModifiedDate = dayjs(entity.lastModifiedDate);
    }
    
    return entity;
  }
  
  protected convertResponseFromServer(res: HttpResponse<RestMaintenanceLog>): HttpResponse<IMaintenanceLog> {
    return res.clone({ body: res.body ? this.convertDateFromServer(res.body) : null });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMaintenanceLog[]>): HttpResponse<IMaintenanceLog[]> {
    return res.clone({ body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null });
  }
}
