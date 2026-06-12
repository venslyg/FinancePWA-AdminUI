import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBinCardLine, NewBinCardLine } from '../bin-card-line.model';



type BinCardLineFormGroupInput = IBinCardLine | Partial<NewBinCardLine>;
type BinCardLineFormRawValue = IBinCardLine;
export type BinCardLineFormGroup = FormGroup<{
  id: FormControl<IBinCardLine['id'] | NewBinCardLine['id']>;
  
  inventoryItemCode: FormControl<IBinCardLine['inventoryItemCode']>;
  
  date: FormControl<IBinCardLine['date']>;
  
  referenceNo: FormControl<IBinCardLine['referenceNo']>;
  
  description: FormControl<IBinCardLine['description']>;
  
  quantityIn: FormControl<IBinCardLine['quantityIn']>;
  
  quantityOut: FormControl<IBinCardLine['quantityOut']>;
  
  runningBalance: FormControl<IBinCardLine['runningBalance']>;
  
  createdBy: FormControl<IBinCardLine['createdBy']>;
  
  createdDate: FormControl<IBinCardLine['createdDate']>;
  
  lastModifiedBy: FormControl<IBinCardLine['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IBinCardLine['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class BinCardLineFormService {
  createBinCardLineFormGroup(entity: BinCardLineFormGroupInput = { id: null }): BinCardLineFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      inventoryItemCode: new FormControl(entity.inventoryItemCode),
      
      date: new FormControl(entity.date),
      
      referenceNo: new FormControl(entity.referenceNo),
      
      description: new FormControl(entity.description),
      
      quantityIn: new FormControl(entity.quantityIn),
      
      quantityOut: new FormControl(entity.quantityOut),
      
      runningBalance: new FormControl(entity.runningBalance),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getBinCardLine(form: BinCardLineFormGroup): IBinCardLine | NewBinCardLine {
    return form.getRawValue() as IBinCardLine | NewBinCardLine;
  }

  resetForm(form: BinCardLineFormGroup, entity: BinCardLineFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
