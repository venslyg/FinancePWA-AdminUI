import dayjs from 'dayjs/esm';
import { ArchiveStatus } from '../../enums/archive-status.model';



export interface IAssociation {
  id?: number;


  name?: String | null;


  description?: String | null;


  contactNumber?: String | null;


  archiveStatus?: ArchiveStatus | null;


  address?: String | null;


  zone?: String | null;


  subZone?: String | null;


  keywords?: String | null;


  createdBy?: String | null;


  createdDate?: dayjs.Dayjs | null;


  lastModifiedBy?: String | null;


  lastModifiedDate?: dayjs.Dayjs | null;

}

export type NewAssociation = Omit<IAssociation, 'id'> & { id: null };
