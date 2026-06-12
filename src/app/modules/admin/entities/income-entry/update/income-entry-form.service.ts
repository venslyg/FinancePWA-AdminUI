import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IIncomeEntry, NewIncomeEntry } from '../income-entry.model';



type IncomeEntryFormGroupInput = IIncomeEntry | Partial<NewIncomeEntry>;
type IncomeEntryFormRawValue = IIncomeEntry;
export type IncomeEntryFormGroup = FormGroup<{
  id: FormControl<IIncomeEntry['id'] | NewIncomeEntry['id']>;
  
  branchCode: FormControl<IIncomeEntry['branchCode']>;
  
  accountCode: FormControl<IIncomeEntry['accountCode']>;
  
  incomeCode: FormControl<IIncomeEntry['incomeCode']>;
  
  createdByUsername: FormControl<IIncomeEntry['createdByUsername']>;
  
  date: FormControl<IIncomeEntry['date']>;
  
  receiptNo: FormControl<IIncomeEntry['receiptNo']>;
  
  description: FormControl<IIncomeEntry['description']>;
  
  incomeType: FormControl<IIncomeEntry['incomeType']>;
  
  amount: FormControl<IIncomeEntry['amount']>;
  
  paymentMethod: FormControl<IIncomeEntry['paymentMethod']>;
  
  receivablePerson: FormControl<IIncomeEntry['receivablePerson']>;
  
  receivedBy: FormControl<IIncomeEntry['receivedBy']>;
  
  syncStatus: FormControl<IIncomeEntry['syncStatus']>;
  
  createdBy: FormControl<IIncomeEntry['createdBy']>;
  
  createdDate: FormControl<IIncomeEntry['createdDate']>;
  
  lastModifiedBy: FormControl<IIncomeEntry['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IIncomeEntry['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class IncomeEntryFormService {
  createIncomeEntryFormGroup(entity: IncomeEntryFormGroupInput = { id: null }): IncomeEntryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      accountCode: new FormControl(entity.accountCode),
      
      incomeCode: new FormControl(entity.incomeCode),
      
      createdByUsername: new FormControl(entity.createdByUsername),
      
      date: new FormControl(entity.date),
      
      receiptNo: new FormControl(entity.receiptNo),
      
      description: new FormControl(entity.description),
      
      incomeType: new FormControl(entity.incomeType),
      
      amount: new FormControl(entity.amount),
      
      paymentMethod: new FormControl(entity.paymentMethod),
      
      receivablePerson: new FormControl(entity.receivablePerson),
      
      receivedBy: new FormControl(entity.receivedBy),
      
      syncStatus: new FormControl(entity.syncStatus),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getIncomeEntry(form: IncomeEntryFormGroup): IIncomeEntry | NewIncomeEntry {
    return form.getRawValue() as IIncomeEntry | NewIncomeEntry;
  }

  resetForm(form: IncomeEntryFormGroup, entity: IncomeEntryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
