import dayjs from 'dayjs/esm';




export interface IBranch {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  branchName?: String | null;
  
  
  location?: String | null;
  
  
  phoneNumber?: String | null;
  
  
  isActive?: boolean | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewBranch = Omit<IBranch, 'id'> & { id: null };
