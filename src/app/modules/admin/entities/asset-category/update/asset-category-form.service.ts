import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssetCategory, NewAssetCategory } from '../asset-category.model';



type AssetCategoryFormGroupInput = IAssetCategory | Partial<NewAssetCategory>;
type AssetCategoryFormRawValue = IAssetCategory;
export type AssetCategoryFormGroup = FormGroup<{
  id: FormControl<IAssetCategory['id'] | NewAssetCategory['id']>;
  
  assetCategoryCode: FormControl<IAssetCategory['assetCategoryCode']>;
  
  assetCategoryName: FormControl<IAssetCategory['assetCategoryName']>;
  
  description: FormControl<IAssetCategory['description']>;
  
  createdBy: FormControl<IAssetCategory['createdBy']>;
  
  createdDate: FormControl<IAssetCategory['createdDate']>;
  
  lastModifiedBy: FormControl<IAssetCategory['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IAssetCategory['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class AssetCategoryFormService {
  createAssetCategoryFormGroup(entity: AssetCategoryFormGroupInput = { id: null }): AssetCategoryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      assetCategoryCode: new FormControl(entity.assetCategoryCode),
      
      assetCategoryName: new FormControl(entity.assetCategoryName),
      
      description: new FormControl(entity.description),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getAssetCategory(form: AssetCategoryFormGroup): IAssetCategory | NewAssetCategory {
    return form.getRawValue() as IAssetCategory | NewAssetCategory;
  }

  resetForm(form: AssetCategoryFormGroup, entity: AssetCategoryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
