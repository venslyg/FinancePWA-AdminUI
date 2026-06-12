import dayjs from 'dayjs/esm';




export interface IPettyCashLedger {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  pettyCashCode?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  pettyCashVoucherNo?: String | null;
  
  
  description?: String | null;
  
  
  cashIn?: number | null;
  
  
  cashOut?: number | null;
  
  
  runningBalance?: number | null;
  
  
  linkedAccountCode?: String | null;
  
  
  referenceNo?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewPettyCashLedger = Omit<IPettyCashLedger, 'id'> & { id: null };
