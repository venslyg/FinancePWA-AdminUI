import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssociation, NewAssociation } from '../association.model';

// Custom validator for contact number format (+XXYYYYYYYYY)
export function contactNumberValidator(control: FormControl) {
  if (!control.value) {
    return null; // Let required validator handle empty values
  }

  const phoneRegex = /^\+\d{2}\d{9}$/;
  if (!phoneRegex.test(control.value)) {
    return { invalidContactNumber: { message: 'Contact number must be in format +XXYYYYYYYYY (e.g., +94123456789)' } };
  }

  return null;
}

type AssociationFormGroupInput = IAssociation | Partial<NewAssociation>;
type AssociationFormRawValue = IAssociation;
export type AssociationFormGroup = FormGroup<{
  id: FormControl<IAssociation['id'] | NewAssociation['id']>;

  name: FormControl<IAssociation['name']>;

  description: FormControl<IAssociation['description']>;

  contactNumber: FormControl<IAssociation['contactNumber']>;

  archiveStatus: FormControl<IAssociation['archiveStatus']>;

  address: FormControl<IAssociation['address']>;

  zone: FormControl<IAssociation['zone']>;

  subZone: FormControl<IAssociation['subZone']>;

  keywords: FormControl<IAssociation['keywords']>;

  createdBy: FormControl<IAssociation['createdBy']>;

  createdDate: FormControl<IAssociation['createdDate']>;

  lastModifiedBy: FormControl<IAssociation['lastModifiedBy']>;

  lastModifiedDate: FormControl<IAssociation['lastModifiedDate']>;

}>;

@Injectable({ providedIn: 'root' })
export class AssociationFormService {
  createAssociationFormGroup(entity: AssociationFormGroupInput = { id: null }): AssociationFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),

      name: new FormControl(entity.name, [Validators.required]),

      description: new FormControl(entity.description),

      contactNumber: new FormControl(entity.contactNumber, [Validators.required, contactNumberValidator]),

      archiveStatus: new FormControl(entity.archiveStatus),

      address: new FormControl(entity.address),

      zone: new FormControl(entity.zone),

      subZone: new FormControl(entity.subZone),

      keywords: new FormControl(entity.keywords),

      createdBy: new FormControl(entity.createdBy),

      createdDate: new FormControl(entity.createdDate),

      lastModifiedBy: new FormControl(entity.lastModifiedBy),

      lastModifiedDate: new FormControl(entity.lastModifiedDate),

    });
    return form;
  }

  getAssociation(form: AssociationFormGroup): IAssociation | NewAssociation {
    return form.getRawValue() as IAssociation | NewAssociation;
  }

  resetForm(form: AssociationFormGroup, entity: AssociationFormGroupInput): void {
    form.reset(entity as any);
    form.controls.id.setValue(entity.id);
  }
}
