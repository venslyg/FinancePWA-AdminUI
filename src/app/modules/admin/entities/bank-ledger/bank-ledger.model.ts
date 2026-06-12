import dayjs from 'dayjs/esm';




export interface IBankLedger {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  bankLedgerCode?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  referenceNo?: String | null;
  
  
  description?: String | null;
  
  
  depositAmount?: number | null;
  
  
  withdrawalAmount?: number | null;
  
  
  runningBalance?: number | null;
  
  
  remark?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewBankLedger = Omit<IBankLedger, 'id'> & { id: null };
