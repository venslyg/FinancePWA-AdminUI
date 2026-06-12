import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssetRegister, NewAssetRegister } from '../asset-register.model';



type AssetRegisterFormGroupInput = IAssetRegister | Partial<NewAssetRegister>;
type AssetRegisterFormRawValue = IAssetRegister;
export type AssetRegisterFormGroup = FormGroup<{
  id: FormControl<IAssetRegister['id'] | NewAssetRegister['id']>;
  
  branchCode: FormControl<IAssetRegister['branchCode']>;
  
  assetRegisterCode: FormControl<IAssetRegister['assetRegisterCode']>;
  
  assetCategoryCode: FormControl<IAssetRegister['assetCategoryCode']>;
  
  assetSubCategoryCode: FormControl<IAssetRegister['assetSubCategoryCode']>;
  
  assetName: FormControl<IAssetRegister['assetName']>;
  
  category: FormControl<IAssetRegister['category']>;
  
  purchaseDate: FormControl<IAssetRegister['purchaseDate']>;
  
  purchaseCost: FormControl<IAssetRegister['purchaseCost']>;
  
  currentValue: FormControl<IAssetRegister['currentValue']>;
  
  depreciationRate: FormControl<IAssetRegister['depreciationRate']>;
  
  accumulatedDepreciation: FormControl<IAssetRegister['accumulatedDepreciation']>;
  
  createdBy: FormControl<IAssetRegister['createdBy']>;
  
  createdDate: FormControl<IAssetRegister['createdDate']>;
  
  lastModifiedBy: FormControl<IAssetRegister['lastModifiedBy']>;
  
  lastModifiedDate: FormControl<IAssetRegister['lastModifiedDate']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class AssetRegisterFormService {
  createAssetRegisterFormGroup(entity: AssetRegisterFormGroupInput = { id: null }): AssetRegisterFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      assetRegisterCode: new FormControl(entity.assetRegisterCode),
      
      assetCategoryCode: new FormControl(entity.assetCategoryCode),
      
      assetSubCategoryCode: new FormControl(entity.assetSubCategoryCode),
      
      assetName: new FormControl(entity.assetName),
      
      category: new FormControl(entity.category),
      
      purchaseDate: new FormControl(entity.purchaseDate),
      
      purchaseCost: new FormControl(entity.purchaseCost),
      
      currentValue: new FormControl(entity.currentValue),
      
      depreciationRate: new FormControl(entity.depreciationRate),
      
      accumulatedDepreciation: new FormControl(entity.accumulatedDepreciation),
      
      createdBy: new FormControl(entity.createdBy),
      
      createdDate: new FormControl(entity.createdDate),
      
      lastModifiedBy: new FormControl(entity.lastModifiedBy),
      
      lastModifiedDate: new FormControl(entity.lastModifiedDate),
      
      
    });
    return form;
  }

  getAssetRegister(form: AssetRegisterFormGroup): IAssetRegister | NewAssetRegister {
    return form.getRawValue() as IAssetRegister | NewAssetRegister;
  }

  resetForm(form: AssetRegisterFormGroup, entity: AssetRegisterFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}
