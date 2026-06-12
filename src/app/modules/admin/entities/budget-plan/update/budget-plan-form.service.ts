import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBudgetPlan, NewBudgetPlan } from '../budget-plan.model';



type BudgetPlanFormGroupInput = IBudgetPlan | Partial<NewBudgetPlan>;
type BudgetPlanFormRawValue = IBudgetPlan;
export type BudgetPlanFormGroup = FormGroup<{
  id: FormControl<IBudgetPlan['id'] | NewBudgetPlan['id']>;
  
  branchCode: FormControl<IBudgetPlan['branchCode']>;
  
  accountCode: FormControl<IBudgetPlan['accountCode']>;
  
  budgetPlanCode: FormControl<IBudgetPlan['budgetPlanCode']>;
  
  departmentName: FormControl<IBudgetPlan['departmentName']>;
  
  year: FormControl<IBudgetPlan['year']>;
  
  allocatedAmount: FormControl<IBudgetPlan['allocatedAmount']>;
  
  spentAmount: FormControl<IBudgetPlan['spentAmount']>;
  
  remainingAmount: FormControl<IBudgetPlan['remainingAmount']>;
  
  usedPercentage: FormControl<IBudgetPlan['usedPercentage']>;
  
  alertStatus: FormControl<IBudgetPlan['alertStatus']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class BudgetPlanFormService {
  createBudgetPlanFormGroup(entity: BudgetPlanFormGroupInput = { id: null }): BudgetPlanFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      accountCode: new FormControl(entity.accountCode),
      
      budgetPlanCode: new FormControl(entity.budgetPlanCode),
      
      departmentName: new FormControl(entity.departmentName),
      
      year: new FormControl(entity.year),
      
      allocatedAmount: new FormControl(entity.allocatedAmount),
      
      spentAmount: new FormControl(entity.spentAmount),
      
      remainingAmount: new FormControl(entity.remainingAmount),
      
      usedPercentage: new FormControl(entity.usedPercentage),
      
      alertStatus: new FormControl(entity.alertStatus),
      
      
    });
    return form;
  }

  getBudgetPlan(form: BudgetPlanFormGroup): IBudgetPlan | NewBudgetPlan {
    return form.getRawValue() as IBudgetPlan | NewBudgetPlan;
  }

  resetForm(form: BudgetPlanFormGroup, entity: BudgetPlanFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

