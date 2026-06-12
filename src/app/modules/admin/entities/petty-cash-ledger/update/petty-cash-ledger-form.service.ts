import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPettyCashLedger, NewPettyCashLedger } from '../petty-cash-ledger.model';



type PettyCashLedgerFormGroupInput = IPettyCashLedger | Partial<NewPettyCashLedger>;
type PettyCashLedgerFormRawValue = IPettyCashLedger;
export type PettyCashLedgerFormGroup = FormGroup<{
  id: FormControl<IPettyCashLedger['id'] | NewPettyCashLedger['id']>;
  
  branchCode: FormControl<IPettyCashLedger['branchCode']>;
  
  pettyCashCode: FormControl<IPettyCashLedger['pettyCashCode']>;
  
  date: FormControl<IPettyCashLedger['date']>;
  
  pettyCashVoucherNo: FormControl<IPettyCashLedger['pettyCashVoucherNo']>;
  
  description: FormControl<IPettyCashLedger['description']>;
  
  cashIn: FormControl<IPettyCashLedger['cashIn']>;
  
  cashOut: FormControl<IPettyCashLedger['cashOut']>;
  
  runningBalance: FormControl<IPettyCashLedger['runningBalance']>;
  
  linkedAccountCode: FormControl<IPettyCashLedger['linkedAccountCode']>;
  
  referenceNo: FormControl<IPettyCashLedger['referenceNo']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class PettyCashLedgerFormService {
  createPettyCashLedgerFormGroup(entity: PettyCashLedgerFormGroupInput = { id: null }): PettyCashLedgerFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      pettyCashCode: new FormControl(entity.pettyCashCode),
      
      date: new FormControl(entity.date),
      
      pettyCashVoucherNo: new FormControl(entity.pettyCashVoucherNo),
      
      description: new FormControl(entity.description),
      
      cashIn: new FormControl(entity.cashIn),
      
      cashOut: new FormControl(entity.cashOut),
      
      runningBalance: new FormControl(entity.runningBalance),
      
      linkedAccountCode: new FormControl(entity.linkedAccountCode),
      
      referenceNo: new FormControl(entity.referenceNo),
      
      
    });
    return form;
  }

  getPettyCashLedger(form: PettyCashLedgerFormGroup): IPettyCashLedger | NewPettyCashLedger {
    return form.getRawValue() as IPettyCashLedger | NewPettyCashLedger;
  }

  resetForm(form: PettyCashLedgerFormGroup, entity: PettyCashLedgerFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

