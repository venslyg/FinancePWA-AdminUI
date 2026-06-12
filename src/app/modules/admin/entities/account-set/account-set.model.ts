import dayjs from 'dayjs/esm';

import { AccountType } from '../../enums/account-type.model';


export interface IAccountSet {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  accountCode?: String | null;
  
  
  accountName?: String | null;
  
  
  accountType?: AccountType | null;
  
  
  subCategory?: String | null;
  
  
  remark?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewAccountSet = Omit<IAccountSet, 'id'> & { id: null };
