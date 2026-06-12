import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IInventoryItem, NewInventoryItem } from '../inventory-item.model';



type InventoryItemFormGroupInput = IInventoryItem | Partial<NewInventoryItem>;
type InventoryItemFormRawValue = IInventoryItem;
export type InventoryItemFormGroup = FormGroup<{
  id: FormControl<IInventoryItem['id'] | NewInventoryItem['id']>;
  
  branchCode: FormControl<IInventoryItem['branchCode']>;
  
  inventoryItemCode: FormControl<IInventoryItem['inventoryItemCode']>;
  
  itemName: FormControl<IInventoryItem['itemName']>;
  
  category: FormControl<IInventoryItem['category']>;
  
  quantity: FormControl<IInventoryItem['quantity']>;
  
  unitPrice: FormControl<IInventoryItem['unitPrice']>;
  
  runningStockCount: FormControl<IInventoryItem['runningStockCount']>;
  
  createdBy: FormControl<IInventoryItem['createdBy']>;
  
  createdDate: FormControl<IInventoryItem['createdDate']>;
  
  lastModifiedBy: FormControl<IInventoryItem['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IInventoryItem['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class InventoryItemFormService {
  createInventoryItemFormGroup(entity: InventoryItemFormGroupInput = { id: null }): InventoryItemFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      inventoryItemCode: new FormControl(entity.inventoryItemCode),
      
      itemName: new FormControl(entity.itemName),
      
      category: new FormControl(entity.category),
      
      quantity: new FormControl(entity.quantity),
      
      unitPrice: new FormControl(entity.unitPrice),
      
      runningStockCount: new FormControl(entity.runningStockCount),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getInventoryItem(form: InventoryItemFormGroup): IInventoryItem | NewInventoryItem {
    return form.getRawValue() as IInventoryItem | NewInventoryItem;
  }

  resetForm(form: InventoryItemFormGroup, entity: InventoryItemFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
