import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssetDepreciationHistory, NewAssetDepreciationHistory } from '../asset-depreciation-history.model';



type AssetDepreciationHistoryFormGroupInput = IAssetDepreciationHistory | Partial<NewAssetDepreciationHistory>;
type AssetDepreciationHistoryFormRawValue = IAssetDepreciationHistory;
export type AssetDepreciationHistoryFormGroup = FormGroup<{
  id: FormControl<IAssetDepreciationHistory['id'] | NewAssetDepreciationHistory['id']>;
  
  assetRegisterCode: FormControl<IAssetDepreciationHistory['assetRegisterCode']>;
  
  depreciationDate: FormControl<IAssetDepreciationHistory['depreciationDate']>;
  
  depreciationAmount: FormControl<IAssetDepreciationHistory['depreciationAmount']>;
  
  valueAfterDepreciation: FormControl<IAssetDepreciationHistory['valueAfterDepreciation']>;
  
  processedBy: FormControl<IAssetDepreciationHistory['processedBy']>;
  
  createdBy: FormControl<IAssetDepreciationHistory['createdBy']>;
  
  createdDate: FormControl<IAssetDepreciationHistory['createdDate']>;
  
  lastModifiedBy: FormControl<IAssetDepreciationHistory['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IAssetDepreciationHistory['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class AssetDepreciationHistoryFormService {
  createAssetDepreciationHistoryFormGroup(entity: AssetDepreciationHistoryFormGroupInput = { id: null }): AssetDepreciationHistoryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      assetRegisterCode: new FormControl(entity.assetRegisterCode),
      
      depreciationDate: new FormControl(entity.depreciationDate),
      
      depreciationAmount: new FormControl(entity.depreciationAmount),
      
      valueAfterDepreciation: new FormControl(entity.valueAfterDepreciation),
      
      processedBy: new FormControl(entity.processedBy),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getAssetDepreciationHistory(form: AssetDepreciationHistoryFormGroup): IAssetDepreciationHistory | NewAssetDepreciationHistory {
    return form.getRawValue() as IAssetDepreciationHistory | NewAssetDepreciationHistory;
  }

  resetForm(form: AssetDepreciationHistoryFormGroup, entity: AssetDepreciationHistoryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
