import dayjs from 'dayjs/esm';
import { IAssetCategory } from '../asset-category/asset-category.model';

export interface IAssetSubCategory {
  id?: number;
  
  
  assetCategoryCode?: String | null;
  
  
  assetSubCategoryCode?: String | null;
  
  
  assetSubCategoryName?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  isActive?: boolean | null;
  category?: IAssetCategory | null;
}

export type NewAssetSubCategory = Omit<IAssetSubCategory, 'id'> & { id: null };
