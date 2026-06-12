import dayjs from 'dayjs/esm';




export interface IAssetDepreciationHistory {
  id?: number;
  
  
  assetRegisterCode?: String | null;
  
  
  depreciationDate?: dayjs.Dayjs | null;
  
  
  depreciationAmount?: number | null;
  
  
  valueAfterDepreciation?: number | null;
  
  
  processedBy?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewAssetDepreciationHistory = Omit<IAssetDepreciationHistory, 'id'> & { id: null };
