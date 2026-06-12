import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDonationTracker, NewDonationTracker } from '../donation-tracker.model';



type DonationTrackerFormGroupInput = IDonationTracker | Partial<NewDonationTracker>;
type DonationTrackerFormRawValue = IDonationTracker;
export type DonationTrackerFormGroup = FormGroup<{
  id: FormControl<IDonationTracker['id'] | NewDonationTracker['id']>;
  
  branchCode: FormControl<IDonationTracker['branchCode']>;
  
  donationIdCode: FormControl<IDonationTracker['donationIdCode']>;
  
  date: FormControl<IDonationTracker['date']>;
  
  donorNameOrOrg: FormControl<IDonationTracker['donorNameOrOrg']>;
  
  contactDetails: FormControl<IDonationTracker['contactDetails']>;
  
  amount: FormControl<IDonationTracker['amount']>;
  
  purpose: FormControl<IDonationTracker['purpose']>;
  
  receivedViaMode: FormControl<IDonationTracker['receivedViaMode']>;
  
  notes: FormControl<IDonationTracker['notes']>;
  
  
}>;

@Injectable({ providedIn: 'root' })
export class DonationTrackerFormService {
  createDonationTrackerFormGroup(entity: DonationTrackerFormGroupInput = { id: null }): DonationTrackerFormGroup {
    const form = new FormGroup({
      id: new FormControl(
        { value: entity.id, disabled: true },
        { nonNullable: true, validators: [Validators.required] }
      ),
      
      branchCode: new FormControl(entity.branchCode),
      
      donationIdCode: new FormControl(entity.donationIdCode),
      
      date: new FormControl(entity.date),
      
      donorNameOrOrg: new FormControl(entity.donorNameOrOrg),
      
      contactDetails: new FormControl(entity.contactDetails),
      
      amount: new FormControl(entity.amount),
      
      purpose: new FormControl(entity.purpose),
      
      receivedViaMode: new FormControl(entity.receivedViaMode),
      
      notes: new FormControl(entity.notes),
      
      
    });
    return form;
  }

  getDonationTracker(form: DonationTrackerFormGroup): IDonationTracker | NewDonationTracker {
    return form.getRawValue() as IDonationTracker | NewDonationTracker;
  }

  resetForm(form: DonationTrackerFormGroup, entity: DonationTrackerFormGroupInput): void {
    form.reset({
      ...entity,
      
    } as any);
    form.controls.id.setValue(entity.id);
  }
}

