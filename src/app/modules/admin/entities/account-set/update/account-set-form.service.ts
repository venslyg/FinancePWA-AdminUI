import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccountSet, NewAccountSet } from '../account-set.model';



type AccountSetFormGroupInput = IAccountSet | Partial<NewAccountSet>;
type AccountSetFormRawValue = IAccountSet;
export type AccountSetFormGroup = FormGroup<{
  id: FormControl<IAccountSet['id'] | NewAccountSet['id']>;
  
  branchCode: FormControl<IAccountSet['branchCode']>;
  
  accountCode: FormControl<IAccountSet['accountCode']>;
  
  accountName: FormControl<IAccountSet['accountName']>;
  
  accountType: FormControl<IAccountSet['accountType']>;
  
  subCategory: FormControl<IAccountSet['subCategory']>;
  
  remark: FormControl<IAccountSet['remark']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class AccountSetFormService {
  createAccountSetFormGroup(entity: AccountSetFormGroupInput = { id: null }): AccountSetFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      accountCode: new FormControl(entity.accountCode),
      
      accountName: new FormControl(entity.accountName),
      
      accountType: new FormControl(entity.accountType),
      
      subCategory: new FormControl(entity.subCategory),
      
      remark: new FormControl(entity.remark),
      
      
    });
    return form;
  }

  getAccountSet(form: AccountSetFormGroup): IAccountSet | NewAccountSet {
    return form.getRawValue() as IAccountSet | NewAccountSet;
  }

  resetForm(form: AccountSetFormGroup, entity: AccountSetFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

