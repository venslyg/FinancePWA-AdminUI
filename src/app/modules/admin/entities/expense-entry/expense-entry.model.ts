import dayjs from 'dayjs/esm';

import { PaymentMode } from '../../enums/payment-mode.model';
import { ApprovalStatus } from '../../enums/approval-status.model';
import { SyncStatus } from '../../enums/sync-status.model';


export interface IExpenseEntry {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  accountCode?: String | null;
  
  
  expenseCode?: String | null;
  
  
  expenseCategoryCode?: String | null;
  
  
  expenseSubCategoryCode?: String | null;
  
  
  createdByUsername?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  voucherNo?: String | null;
  
  
  description?: String | null;
  
  
  amount?: number | null;
  
  
  paymentMode?: PaymentMode | null;
  
  
  approvalStatus?: ApprovalStatus | null;
  
  
  approvedBy?: String | null;
  
  
  vendor?: String | null;
  
  
  syncStatus?: SyncStatus | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewExpenseEntry = Omit<IExpenseEntry, 'id'> & { id: null };
