import dayjs from 'dayjs/esm';

import { IncomeType } from '../../enums/income-type.model';
import { PaymentMode } from '../../enums/payment-mode.model';
import { SyncStatus } from '../../enums/sync-status.model';


export interface IIncomeEntry {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  accountCode?: String | null;
  
  
  incomeCode?: String | null;
  
  
  createdByUsername?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  receiptNo?: String | null;
  
  
  description?: String | null;
  
  
  incomeType?: IncomeType | null;
  
  
  amount?: number | null;
  
  
  paymentMethod?: PaymentMode | null;
  
  
  receivablePerson?: String | null;
  
  
  receivedBy?: String | null;
  
  
  syncStatus?: SyncStatus | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewIncomeEntry = Omit<IIncomeEntry, 'id'> & { id: null };
