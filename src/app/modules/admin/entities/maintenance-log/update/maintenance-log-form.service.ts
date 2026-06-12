import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMaintenanceLog, NewMaintenanceLog } from '../maintenance-log.model';



type MaintenanceLogFormGroupInput = IMaintenanceLog | Partial<NewMaintenanceLog>;
type MaintenanceLogFormRawValue = IMaintenanceLog;
export type MaintenanceLogFormGroup = FormGroup<{
  id: FormControl<IMaintenanceLog['id'] | NewMaintenanceLog['id']>;
  
  maintenanceLogCode: FormControl<IMaintenanceLog['maintenanceLogCode']>;
  
  logDate: FormControl<IMaintenanceLog['logDate']>;
  
  logType: FormControl<IMaintenanceLog['logType']>;
  
  description: FormControl<IMaintenanceLog['description']>;
  
  cost: FormControl<IMaintenanceLog['cost']>;
  
  vendor: FormControl<IMaintenanceLog['vendor']>;
  
  nextServiceDate: FormControl<IMaintenanceLog['nextServiceDate']>;
  
  note: FormControl<IMaintenanceLog['note']>;
  
  createdBy: FormControl<IMaintenanceLog['createdBy']>;
  
  createdDate: FormControl<IMaintenanceLog['createdDate']>;
  
  lastModifiedBy: FormControl<IMaintenanceLog['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IMaintenanceLog['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class MaintenanceLogFormService {
  createMaintenanceLogFormGroup(entity: MaintenanceLogFormGroupInput = { id: null }): MaintenanceLogFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      maintenanceLogCode: new FormControl(entity.maintenanceLogCode),
      
      logDate: new FormControl(entity.logDate),
      
      logType: new FormControl(entity.logType),
      
      description: new FormControl(entity.description),
      
      cost: new FormControl(entity.cost),
      
      vendor: new FormControl(entity.vendor),
      
      nextServiceDate: new FormControl(entity.nextServiceDate),
      
      note: new FormControl(entity.note),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getMaintenanceLog(form: MaintenanceLogFormGroup): IMaintenanceLog | NewMaintenanceLog {
    return form.getRawValue() as IMaintenanceLog | NewMaintenanceLog;
  }

  resetForm(form: MaintenanceLogFormGroup, entity: MaintenanceLogFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
