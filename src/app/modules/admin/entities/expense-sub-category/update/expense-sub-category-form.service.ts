import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExpenseSubCategory, NewExpenseSubCategory } from '../expense-sub-category.model';



type ExpenseSubCategoryFormGroupInput = IExpenseSubCategory | Partial<NewExpenseSubCategory>;
type ExpenseSubCategoryFormRawValue = IExpenseSubCategory;
export type ExpenseSubCategoryFormGroup = FormGroup<{
  id: FormControl<IExpenseSubCategory['id'] | NewExpenseSubCategory['id']>;
  categoryCode: FormControl<IExpenseSubCategory['categoryCode']>;
  subCategoryCode: FormControl<IExpenseSubCategory['subCategoryCode']>;
  subCategoryName: FormControl<IExpenseSubCategory['subCategoryName']>;
  isActive: FormControl<IExpenseSubCategory['isActive']>;
}>;

@Injectable({ providedIn: 'root' })
export class ExpenseSubCategoryFormService {
  createExpenseSubCategoryFormGroup(entity: ExpenseSubCategoryFormGroupInput = { id: null }): ExpenseSubCategoryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      categoryCode: new FormControl(entity.categoryCode),
      subCategoryCode: new FormControl(entity.subCategoryCode),
      subCategoryName: new FormControl(entity.subCategoryName),
      isActive: new FormControl(entity.isActive ?? true),
    });
    return form;
  }

  getExpenseSubCategory(form: ExpenseSubCategoryFormGroup): IExpenseSubCategory | NewExpenseSubCategory {
    return form.getRawValue() as IExpenseSubCategory | NewExpenseSubCategory;
  }

  resetForm(form: ExpenseSubCategoryFormGroup, entity: ExpenseSubCategoryFormGroupInput): void {
    form.reset({
      ...entity,
      isActive: entity.isActive ?? true,
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

