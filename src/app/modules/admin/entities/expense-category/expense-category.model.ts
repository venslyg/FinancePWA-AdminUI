import dayjs from 'dayjs/esm';




export interface IExpenseCategory {
  id?: number;
  
  
  categoryCode?: String | null;
  
  
  categoryName?: String | null;
  
  
  description?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewExpenseCategory = Omit<IExpenseCategory, 'id'> & { id: null };
