import dayjs from 'dayjs/esm';




export interface IAssetSubCategory {
  id?: number;
  
  
  assetCategoryCode?: String | null;
  
  
  assetSubCategoryCode?: String | null;
  
  
  assetSubCategoryName?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewAssetSubCategory = Omit<IAssetSubCategory, 'id'> & { id: null };
