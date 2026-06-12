import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBranch, NewBranch } from '../branch.model';



type BranchFormGroupInput = IBranch | Partial<NewBranch>;
type BranchFormRawValue = IBranch;
export type BranchFormGroup = FormGroup<{
  id: FormControl<IBranch['id'] | NewBranch['id']>;
  
  branchCode: FormControl<IBranch['branchCode']>;
  
  branchName: FormControl<IBranch['branchName']>;
  
  location: FormControl<IBranch['location']>;
  
  phoneNumber: FormControl<IBranch['phoneNumber']>;
  
  isActive: FormControl<IBranch['isActive']>;
  
  createdBy: FormControl<IBranch['createdBy']>;
  
  createdDate: FormControl<IBranch['createdDate']>;
  
  lastModifiedBy: FormControl<IBranch['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IBranch['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class BranchFormService {
  createBranchFormGroup(entity: BranchFormGroupInput = { id: null }): BranchFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      branchName: new FormControl(entity.branchName),
      
      location: new FormControl(entity.location),
      
      phoneNumber: new FormControl(entity.phoneNumber),
      
      isActive: new FormControl(entity.isActive),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getBranch(form: BranchFormGroup): IBranch | NewBranch {
    return form.getRawValue() as IBranch | NewBranch;
  }

  resetForm(form: BranchFormGroup, entity: BranchFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
