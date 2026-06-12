import dayjs from 'dayjs/esm';




export interface IAssetRegister {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  assetRegisterCode?: String | null;
  
  
  assetCategoryCode?: String | null;
  
  
  assetSubCategoryCode?: String | null;
  
  
  assetName?: String | null;
  
  
  category?: String | null;
  
  
  purchaseDate?: dayjs.Dayjs | null;
  
  
  purchaseCost?: number | null;
  
  
  currentValue?: number | null;
  
  
  depreciationRate?: number | null;
  
  
  accumulatedDepreciation?: number | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewAssetRegister = Omit<IAssetRegister, 'id'> & { id: null };
