import dayjs from 'dayjs/esm';




export interface IAssetCategory {
  id?: number;
  
  
  assetCategoryCode?: String | null;
  
  
  assetCategoryName?: String | null;
  
  
  description?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewAssetCategory = Omit<IAssetCategory, 'id'> & { id: null };
