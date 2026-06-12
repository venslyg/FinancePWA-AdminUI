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

import { IBankLedger, NewBankLedger } from '../bank-ledger.model';
import { BankLedgerService } from '../service/bank-ledger.service';
import { BankLedgerFormGroup, BankLedgerFormService } from '../update/bank-ledger-form.service';






type BankLedgerFormDialogData = {
  entity?: IBankLedger;
  defaults?: Partial<NewBankLedger>;
  heading?: string;
};

@Component({
  selector: 'app-bank-ledger-form',
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
  templateUrl: './bank-ledger-form.component.html',
})
export class BankLedgerFormComponent implements OnInit, OnChanges {
  private readonly bankLedgerService = inject(BankLedgerService);
  private readonly formService = inject(BankLedgerFormService);
  private readonly dialogRef = inject(MatDialogRef<BankLedgerFormComponent>, { optional: true });
  private readonly dialogData = inject(MAT_DIALOG_DATA, { optional: true }) as BankLedgerFormDialogData | null;

  @Input() entity: IBankLedger | null = null;
  @Input() heading?: string;

  @Output() saved = new EventEmitter<IBankLedger>();
  @Output() cancelled = new EventEmitter<void>();

  form: BankLedgerFormGroup = this.formService.createBankLedgerFormGroup();
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
      this.formService.resetForm(this.form, { ...(changes['entity'].currentValue as IBankLedger) });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.isSaving = true;
    const payload = this.formService.getBankLedger(this.form);
    const isUpdate = payload.id !== null;
    const request$ = isUpdate
      ? this.bankLedgerService.update(payload as IBankLedger)
      : this.bankLedgerService.create(payload as NewBankLedger);

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
      this.formService.resetForm(this.form, { id: null, ...defaults } as Partial<NewBankLedger>);
    }
  }

  private loadRelationshipOptions(): void {
    
  }
}
