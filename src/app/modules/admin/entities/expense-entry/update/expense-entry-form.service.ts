import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExpenseEntry, NewExpenseEntry } from '../expense-entry.model';



type ExpenseEntryFormGroupInput = IExpenseEntry | Partial<NewExpenseEntry>;
type ExpenseEntryFormRawValue = IExpenseEntry;
export type ExpenseEntryFormGroup = FormGroup<{
  id: FormControl<IExpenseEntry['id'] | NewExpenseEntry['id']>;
  
  branchCode: FormControl<IExpenseEntry['branchCode']>;
  
  accountCode: FormControl<IExpenseEntry['accountCode']>;
  
  expenseCode: FormControl<IExpenseEntry['expenseCode']>;
  
  expenseCategoryCode: FormControl<IExpenseEntry['expenseCategoryCode']>;
  
  expenseSubCategoryCode: FormControl<IExpenseEntry['expenseSubCategoryCode']>;
  
  createdByUsername: FormControl<IExpenseEntry['createdByUsername']>;
  
  date: FormControl<IExpenseEntry['date']>;
  
  voucherNo: FormControl<IExpenseEntry['voucherNo']>;
  
  description: FormControl<IExpenseEntry['description']>;
  
  amount: FormControl<IExpenseEntry['amount']>;
  
  paymentMode: FormControl<IExpenseEntry['paymentMode']>;
  
  approvalStatus: FormControl<IExpenseEntry['approvalStatus']>;
  
  approvedBy: FormControl<IExpenseEntry['approvedBy']>;
  
  vendor: FormControl<IExpenseEntry['vendor']>;
  
  syncStatus: FormControl<IExpenseEntry['syncStatus']>;
  
  createdBy: FormControl<IExpenseEntry['createdBy']>;
  
  createdDate: FormControl<IExpenseEntry['createdDate']>;
  
  lastModifiedBy: FormControl<IExpenseEntry['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IExpenseEntry['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class ExpenseEntryFormService {
  createExpenseEntryFormGroup(entity: ExpenseEntryFormGroupInput = { id: null }): ExpenseEntryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      accountCode: new FormControl(entity.accountCode),
      
      expenseCode: new FormControl(entity.expenseCode),
      
      expenseCategoryCode: new FormControl(entity.expenseCategoryCode),
      
      expenseSubCategoryCode: new FormControl(entity.expenseSubCategoryCode),
      
      createdByUsername: new FormControl(entity.createdByUsername),
      
      date: new FormControl(entity.date),
      
      voucherNo: new FormControl(entity.voucherNo),
      
      description: new FormControl(entity.description),
      
      amount: new FormControl(entity.amount),
      
      paymentMode: new FormControl(entity.paymentMode),
      
      approvalStatus: new FormControl(entity.approvalStatus),
      
      approvedBy: new FormControl(entity.approvedBy),
      
      vendor: new FormControl(entity.vendor),
      
      syncStatus: new FormControl(entity.syncStatus),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getExpenseEntry(form: ExpenseEntryFormGroup): IExpenseEntry | NewExpenseEntry {
    return form.getRawValue() as IExpenseEntry | NewExpenseEntry;
  }

  resetForm(form: ExpenseEntryFormGroup, entity: ExpenseEntryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
