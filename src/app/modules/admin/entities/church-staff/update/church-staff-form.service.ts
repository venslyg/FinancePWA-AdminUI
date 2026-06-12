import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IChurchStaff, NewChurchStaff } from '../church-staff.model';



type ChurchStaffFormGroupInput = IChurchStaff | Partial<NewChurchStaff>;
type ChurchStaffFormRawValue = IChurchStaff;
export type ChurchStaffFormGroup = FormGroup<{
  id: FormControl<IChurchStaff['id'] | NewChurchStaff['id']>;
  
  staffCode: FormControl<IChurchStaff['staffCode']>;
  
  branchCode: FormControl<IChurchStaff['branchCode']>;
  
  fullName: FormControl<IChurchStaff['fullName']>;
  
  position: FormControl<IChurchStaff['position']>;
  
  staffType: FormControl<IChurchStaff['staffType']>;
  
  contactNumber: FormControl<IChurchStaff['contactNumber']>;
  
  hourlyRateOrMonthlySalary: FormControl<IChurchStaff['hourlyRateOrMonthlySalary']>;
  
  isActive: FormControl<IChurchStaff['isActive']>;
  
  createdBy: FormControl<IChurchStaff['createdBy']>;
  
  createdDate: FormControl<IChurchStaff['createdDate']>;
  
  lastModifiedBy: FormControl<IChurchStaff['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IChurchStaff['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class ChurchStaffFormService {
  createChurchStaffFormGroup(entity: ChurchStaffFormGroupInput = { id: null }): ChurchStaffFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      staffCode: new FormControl(entity.staffCode),
      
      branchCode: new FormControl(entity.branchCode),
      
      fullName: new FormControl(entity.fullName),
      
      position: new FormControl(entity.position),
      
      staffType: new FormControl(entity.staffType),
      
      contactNumber: new FormControl(entity.contactNumber),
      
      hourlyRateOrMonthlySalary: new FormControl(entity.hourlyRateOrMonthlySalary),
      
      isActive: new FormControl(entity.isActive),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getChurchStaff(form: ChurchStaffFormGroup): IChurchStaff | NewChurchStaff {
    return form.getRawValue() as IChurchStaff | NewChurchStaff;
  }

  resetForm(form: ChurchStaffFormGroup, entity: ChurchStaffFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
