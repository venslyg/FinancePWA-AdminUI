import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExpenseCategory, NewExpenseCategory } from '../expense-category.model';



type ExpenseCategoryFormGroupInput = IExpenseCategory | Partial<NewExpenseCategory>;
type ExpenseCategoryFormRawValue = IExpenseCategory;
export type ExpenseCategoryFormGroup = FormGroup<{
  id: FormControl<IExpenseCategory['id'] | NewExpenseCategory['id']>;
  categoryCode: FormControl<IExpenseCategory['categoryCode']>;
  categoryName: FormControl<IExpenseCategory['categoryName']>;
  description: FormControl<IExpenseCategory['description']>;
  isActive: FormControl<IExpenseCategory['isActive']>;
}>;

@Injectable({ providedIn: 'root' })
export class ExpenseCategoryFormService {
  createExpenseCategoryFormGroup(entity: ExpenseCategoryFormGroupInput = { id: null }): ExpenseCategoryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      categoryCode: new FormControl(entity.categoryCode),
      categoryName: new FormControl(entity.categoryName),
      description: new FormControl(entity.description),
      isActive: new FormControl(entity.isActive ?? true),
    });
    return form;
  }

  getExpenseCategory(form: ExpenseCategoryFormGroup): IExpenseCategory | NewExpenseCategory {
    return form.getRawValue() as IExpenseCategory | NewExpenseCategory;
  }

  resetForm(form: ExpenseCategoryFormGroup, entity: ExpenseCategoryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

