import dayjs from 'dayjs/esm';




export interface ISalaryPayout {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  salaryPayoutCode?: String | null;
  
  
  staffCode?: String | null;
  
  
  payPeriod?: String | null;
  
  
  baseSalary?: number | null;
  
  
  allowances?: number | null;
  
  
  deductions?: number | null;
  
  
  netPay?: number | null;
  
  
  payoutDate?: dayjs.Dayjs | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewSalaryPayout = Omit<ISalaryPayout, 'id'> & { id: null };
