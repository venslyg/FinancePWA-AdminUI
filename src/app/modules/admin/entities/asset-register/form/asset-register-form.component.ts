// This is an EJS template that generates the reusable form component for an entity.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { finalize } from 'rxjs/operators';

import { IAssetRegister, NewAssetRegister } from '../asset-register.model';
import { AssetRegisterService } from '../service/asset-register.service';
import { AssetRegisterFormGroup, AssetRegisterFormService } from '../update/asset-register-form.service';






type AssetRegisterFormDialogData = {
  entity?: IAssetRegister;
  defaults?: Partial<NewAssetRegister>;
  heading?: string;
};

@Component({
  selector: 'app-asset-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './asset-register-form.component.html',
})
export class AssetRegisterFormComponent implements OnInit, OnChanges {
  private readonly assetRegisterService = inject(AssetRegisterService);
  private readonly formService = inject(AssetRegisterFormService);
  private readonly dialogRef = inject(MatDialogRef<AssetRegisterFormComponent>, { optional: true });
  private readonly dialogData = inject(MAT_DIALOG_DATA, { optional: true }) as AssetRegisterFormDialogData | null;

  @Input() entity: IAssetRegister | null = null;
  @Input() heading?: string;

  @Output() saved = new EventEmitter<IAssetRegister>();
  @Output() cancelled = new EventEmitter<void>();

  form: AssetRegisterFormGroup = this.formService.createAssetRegisterFormGroup();
  isSaving = false;
  isInitialized = false;
  errorMessage: string | null = null;

  

  

  ngOnInit(): void {
    this.initializeFormFromInputs();
    this.loadRelationshipOptions();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitialized) {
      return;
    }
    if (changes['entity'] && changes['entity'].currentValue) {
      this.formService.resetForm(this.form, { ...(changes['entity'].currentValue as IAssetRegister) });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.isSaving = true;
    const payload = this.formService.getAssetRegister(this.form);
    const isUpdate = payload.id !== null;
    const request$ = isUpdate
      ? this.assetRegisterService.update(payload as IAssetRegister)
      : this.assetRegisterService.create(payload as NewAssetRegister);

    request$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: response => {
        if (response.body) {
          this.saved.emit(response.body);
          this.dialogRef?.close(response.body);
        }
      },
      error: () => {
        this.errorMessage = 'Unable to save record. Please try again.';
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
    this.dialogRef?.close();
  }

  get isEditMode(): boolean {
    return !!this.form.controls.id.value;
  }

  readonly compareEntityById = (option: { id?: number } | null, value: { id?: number } | null): boolean =>
    option && value ? option.id === value.id : option === value;

  private initializeFormFromInputs(): void {
    if (!this.heading && this.dialogData?.heading) {
      this.heading = this.dialogData.heading;
    }
    const entity = this.entity ?? this.dialogData?.entity ?? null;
    const defaults = this.dialogData?.defaults ?? {};
    if (entity) {
      this.formService.resetForm(this.form, entity);
    } else {
      this.formService.resetForm(this.form, { id: null, ...defaults } as Partial<NewAssetRegister>);
    }
  }

  private loadRelationshipOptions(): void {
    
  }
}
