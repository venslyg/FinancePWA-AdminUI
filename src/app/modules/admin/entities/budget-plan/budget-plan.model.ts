import dayjs from 'dayjs/esm';

import { BudgetAlertStatus } from '../../enums/budget-alert-status.model';


export interface IBudgetPlan {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  accountCode?: String | null;
  
  
  budgetPlanCode?: String | null;
  
  
  departmentName?: String | null;
  
  
  year?: number | null;
  
  
  allocatedAmount?: number | null;
  
  
  spentAmount?: number | null;
  
  
  remainingAmount?: number | null;
  
  
  usedPercentage?: number | null;
  
  
  alertStatus?: BudgetAlertStatus | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewBudgetPlan = Omit<IBudgetPlan, 'id'> & { id: null };
