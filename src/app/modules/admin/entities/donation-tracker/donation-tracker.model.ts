import dayjs from 'dayjs/esm';

import { PaymentMode } from '../../enums/payment-mode.model';


export interface IDonationTracker {
  id?: number;
  
  
  branchCode?: String | null;
  
  
  donationIdCode?: String | null;
  
  
  date?: dayjs.Dayjs | null;
  
  
  donorNameOrOrg?: String | null;
  
  
  contactDetails?: String | null;
  
  
  amount?: number | null;
  
  
  purpose?: String | null;
  
  
  receivedViaMode?: PaymentMode | null;
  
  
  notes?: String | null;
  
  
  createdBy?: String | null;
  
  
  createdDate?: dayjs.Dayjs | null;
  
  
  lastModifiedBy?: String | null;
  
  
  lastModifiedDate?: dayjs.Dayjs | null;
  
  
}

export type NewDonationTracker = Omit<IDonationTracker, 'id'> & { id: null };
