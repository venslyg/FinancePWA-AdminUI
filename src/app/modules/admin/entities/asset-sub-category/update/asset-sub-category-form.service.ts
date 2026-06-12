import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssetSubCategory, NewAssetSubCategory } from '../asset-sub-category.model';



type AssetSubCategoryFormGroupInput = IAssetSubCategory | Partial<NewAssetSubCategory>;
type AssetSubCategoryFormRawValue = IAssetSubCategory;
export type AssetSubCategoryFormGroup = FormGroup<{
  id: FormControl<IAssetSubCategory['id'] | NewAssetSubCategory['id']>;
  
  assetCategoryCode: FormControl<IAssetSubCategory['assetCategoryCode']>;
  
  assetSubCategoryCode: FormControl<IAssetSubCategory['assetSubCategoryCode']>;
  
  assetSubCategoryName: FormControl<IAssetSubCategory['assetSubCategoryName']>;
  
  createdBy: FormControl<IAssetSubCategory['createdBy']>;
  
  createdDate: FormControl<IAssetSubCategory['createdDate']>;
  
  lastModifiedBy: FormControl<IAssetSubCategory['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IAssetSubCategory['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class AssetSubCategoryFormService {
  createAssetSubCategoryFormGroup(entity: AssetSubCategoryFormGroupInput = { id: null }): AssetSubCategoryFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      assetCategoryCode: new FormControl(entity.assetCategoryCode),
      
      assetSubCategoryCode: new FormControl(entity.assetSubCategoryCode),
      
      assetSubCategoryName: new FormControl(entity.assetSubCategoryName),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getAssetSubCategory(form: AssetSubCategoryFormGroup): IAssetSubCategory | NewAssetSubCategory {
    return form.getRawValue() as IAssetSubCategory | NewAssetSubCategory;
  }

  resetForm(form: AssetSubCategoryFormGroup, entity: AssetSubCategoryFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
