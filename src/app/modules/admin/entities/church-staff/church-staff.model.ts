import dayjs from 'dayjs/esm';

import { StaffType } from '../../enums/staff-type.model';


export interface IChurchStaff {
  id?: number;
  
  
  staffCode?: String | null;
  
  
  branchCode?: String | null;
  
  
  fullName?: String | null;
  
  
  position?: String | null;
  
  
  staffType?: StaffType | null;
  
  
  contactNumber?: String | null;
  
  
  hourlyRateOrMonthlySalary?: number | null;
  
  
  isActive?: boolean | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewChurchStaff = Omit<IChurchStaff, 'id'> & { id: null };
