import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILiabilityLog, NewLiabilityLog } from '../liability-log.model';



type LiabilityLogFormGroupInput = ILiabilityLog | Partial<NewLiabilityLog>;
type LiabilityLogFormRawValue = ILiabilityLog;
export type LiabilityLogFormGroup = FormGroup<{
  id: FormControl<ILiabilityLog['id'] | NewLiabilityLog['id']>;
  
  branchCode: FormControl<ILiabilityLog['branchCode']>;
  
  liabilityCode: FormControl<ILiabilityLog['liabilityCode']>;
  
  loanFrom: FormControl<ILiabilityLog['loanFrom']>;
  
  description: FormControl<ILiabilityLog['description']>;
  
  liabilityType: FormControl<ILiabilityLog['liabilityType']>;
  
  totalLoanAmount: FormControl<ILiabilityLog['totalLoanAmount']>;
  
  startDate: FormControl<ILiabilityLog['startDate']>;
  
  endDate: FormControl<ILiabilityLog['endDate']>;
  
  interestPercentage: FormControl<ILiabilityLog['interestPercentage']>;
  
  monthlyPaymentAmount: FormControl<ILiabilityLog['monthlyPaymentAmount']>;
  
  principalPaid: FormControl<ILiabilityLog['principalPaid']>;
  
  balanceToPay: FormControl<ILiabilityLog['balanceToPay']>;
  
  status: FormControl<ILiabilityLog['status']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class LiabilityLogFormService {
  createLiabilityLogFormGroup(entity: LiabilityLogFormGroupInput = { id: null }): LiabilityLogFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      liabilityCode: new FormControl(entity.liabilityCode),
      
      loanFrom: new FormControl(entity.loanFrom),
      
      description: new FormControl(entity.description),
      
      liabilityType: new FormControl(entity.liabilityType),
      
      totalLoanAmount: new FormControl(entity.totalLoanAmount),
      
      startDate: new FormControl(entity.startDate),
      
      endDate: new FormControl(entity.endDate),
      
      interestPercentage: new FormControl(entity.interestPercentage),
      
      monthlyPaymentAmount: new FormControl(entity.monthlyPaymentAmount),
      
      principalPaid: new FormControl(entity.principalPaid),
      
      balanceToPay: new FormControl(entity.balanceToPay),
      
      status: new FormControl(entity.status),
      
      
    });
    return form;
  }

  getLiabilityLog(form: LiabilityLogFormGroup): ILiabilityLog | NewLiabilityLog {
    return form.getRawValue() as ILiabilityLog | NewLiabilityLog;
  }

  resetForm(form: LiabilityLogFormGroup, entity: LiabilityLogFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

