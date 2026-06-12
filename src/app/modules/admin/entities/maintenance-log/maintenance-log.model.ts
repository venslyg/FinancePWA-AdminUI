import dayjs from 'dayjs/esm';

import { MaintenanceLogType } from '../../enums/maintenance-log-type.model';


export interface IMaintenanceLog {
  id?: number;
  
  
  maintenanceLogCode?: String | null;
  
  
  logDate?: dayjs.Dayjs | null;
  
  
  logType?: MaintenanceLogType | null;
  
  
  description?: String | null;
  
  
  cost?: number | null;
  
  
  vendor?: String | null;
  
  
  nextServiceDate?: dayjs.Dayjs | null;
  
  
  note?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewMaintenanceLog = Omit<IMaintenanceLog, 'id'> & { id: null };
