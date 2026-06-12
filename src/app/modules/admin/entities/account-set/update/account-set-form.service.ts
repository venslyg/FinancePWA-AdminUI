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
  
  createdBy: FormControl<IAccountSet['createdBy']>;
  
  createdDate: FormControl<IAccountSet['createdDate']>;
  
  lastModifiedBy: FormControl<IAccountSet['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IAccountSet['lastModifiedDate']>;
  
  
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
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
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
