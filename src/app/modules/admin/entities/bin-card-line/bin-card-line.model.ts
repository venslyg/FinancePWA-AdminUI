import dayjs from 'dayjs/esm';




export interface IBinCardLine {
  id?: number;
  
  
  inventoryItemCode?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  referenceNo?: String | null;
  
  
  description?: String | null;
  
  
  quantityIn?: number | null;
  
  
  quantityOut?: number | null;
  
  
  runningBalance?: number | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewBinCardLine = Omit<IBinCardLine, 'id'> & { id: null };
