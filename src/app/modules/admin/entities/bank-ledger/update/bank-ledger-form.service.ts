import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBankLedger, NewBankLedger } from '../bank-ledger.model';



type BankLedgerFormGroupInput = IBankLedger | Partial<NewBankLedger>;
type BankLedgerFormRawValue = IBankLedger;
export type BankLedgerFormGroup = FormGroup<{
  id: FormControl<IBankLedger['id'] | NewBankLedger['id']>;
  
  branchCode: FormControl<IBankLedger['branchCode']>;
  
  bankLedgerCode: FormControl<IBankLedger['bankLedgerCode']>;
  
  date: FormControl<IBankLedger['date']>;
  
  referenceNo: FormControl<IBankLedger['referenceNo']>;
  
  description: FormControl<IBankLedger['description']>;
  
  depositAmount: FormControl<IBankLedger['depositAmount']>;
  
  withdrawalAmount: FormControl<IBankLedger['withdrawalAmount']>;
  
  runningBalance: FormControl<IBankLedger['runningBalance']>;
  
  remark: FormControl<IBankLedger['remark']>;
  
  createdBy: FormControl<IBankLedger['createdBy']>;
  
  createdDate: FormControl<IBankLedger['createdDate']>;
  
  lastModifiedBy: FormControl<IBankLedger['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IBankLedger['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class BankLedgerFormService {
  createBankLedgerFormGroup(entity: BankLedgerFormGroupInput = { id: null }): BankLedgerFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      bankLedgerCode: new FormControl(entity.bankLedgerCode),
      
      date: new FormControl(entity.date),
      
      referenceNo: new FormControl(entity.referenceNo),
      
      description: new FormControl(entity.description),
      
      depositAmount: new FormControl(entity.depositAmount),
      
      withdrawalAmount: new FormControl(entity.withdrawalAmount),
      
      runningBalance: new FormControl(entity.runningBalance),
      
      remark: new FormControl(entity.remark),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getBankLedger(form: BankLedgerFormGroup): IBankLedger | NewBankLedger {
    return form.getRawValue() as IBankLedger | NewBankLedger;
  }

  resetForm(form: BankLedgerFormGroup, entity: BankLedgerFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
