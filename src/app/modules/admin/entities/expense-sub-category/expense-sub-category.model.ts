import dayjs from 'dayjs/esm';
import { IExpenseCategory } from '../expense-category/expense-category.model';

export interface IExpenseSubCategory {
  id?: number;
  categoryCode?: String | null;
  subCategoryCode?: String | null;
  subCategoryName?: String | null;
  createdBy?: String | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: String | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  isActive?: boolean | null;
  category?: IExpenseCategory | null;
}

export type NewExpenseSubCategory = Omit<IExpenseSubCategory, 'id'> & { id: null };
