import dayjs from 'dayjs/esm';

import { LiabilityType } from '../../enums/liability-type.model';
import { ApprovalStatus } from '../../enums/approval-status.model';


export interface ILiabilityLog {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  liabilityCode?: String | null;
  
  
  loanFrom?: String | null;
  
  
  description?: String | null;
  
  
  liabilityType?: LiabilityType | null;
  
  
  totalLoanAmount?: number | null;
  
  
  startDate?: dayjs.Dayjs | null;
  
  
  endDate?: dayjs.Dayjs | null;
  
  
  interestPercentage?: number | null;
  
  
  monthlyPaymentAmount?: number | null;
  
  
  principalPaid?: number | null;
  
  
  balanceToPay?: number | null;
  
  
  status?: ApprovalStatus | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewLiabilityLog = Omit<ILiabilityLog, 'id'> & { id: null };
