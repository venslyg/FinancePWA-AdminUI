import dayjs from 'dayjs/esm';




export interface IInventoryItem {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  inventoryItemCode?: String | null;
  
  
  itemName?: String | null;
  
  
  category?: String | null;
  
  
  quantity?: number | null;
  
  
  unitPrice?: number | null;
  
  
  runningStockCount?: number | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewInventoryItem = Omit<IInventoryItem, 'id'> & { id: null };
