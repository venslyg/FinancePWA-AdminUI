import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISalaryPayout, NewSalaryPayout } from '../salary-payout.model';



type SalaryPayoutFormGroupInput = ISalaryPayout | Partial<NewSalaryPayout>;
type SalaryPayoutFormRawValue = ISalaryPayout;
export type SalaryPayoutFormGroup = FormGroup<{
  id: FormControl<ISalaryPayout['id'] | NewSalaryPayout['id']>;
  
  branchCode: FormControl<ISalaryPayout['branchCode']>;
  
  salaryPayoutCode: FormControl<ISalaryPayout['salaryPayoutCode']>;
  
  staffCode: FormControl<ISalaryPayout['staffCode']>;
  
  payPeriod: FormControl<ISalaryPayout['payPeriod']>;
  
  baseSalary: FormControl<ISalaryPayout['baseSalary']>;
  
  allowances: FormControl<ISalaryPayout['allowances']>;
  
  deductions: FormControl<ISalaryPayout['deductions']>;
  
  netPay: FormControl<ISalaryPayout['netPay']>;
  
  payoutDate: FormControl<ISalaryPayout['payoutDate']>;
  
  createdBy: FormControl<ISalaryPayout['createdBy']>;
  
  createdDate: FormControl<ISalaryPayout['createdDate']>;
  
  lastModifiedBy: FormControl<ISalaryPayout['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<ISalaryPayout['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class SalaryPayoutFormService {
  createSalaryPayoutFormGroup(entity: SalaryPayoutFormGroupInput = { id: null }): SalaryPayoutFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      salaryPayoutCode: new FormControl(entity.salaryPayoutCode),
      
      staffCode: new FormControl(entity.staffCode),
      
      payPeriod: new FormControl(entity.payPeriod),
      
      baseSalary: new FormControl(entity.baseSalary),
      
      allowances: new FormControl(entity.allowances),
      
      deductions: new FormControl(entity.deductions),
      
      netPay: new FormControl(entity.netPay),
      
      payoutDate: new FormControl(entity.payoutDate),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getSalaryPayout(form: SalaryPayoutFormGroup): ISalaryPayout | NewSalaryPayout {
    return form.getRawValue() as ISalaryPayout | NewSalaryPayout;
  }

  resetForm(form: SalaryPayoutFormGroup, entity: SalaryPayoutFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
