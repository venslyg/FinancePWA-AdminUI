import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>OTP Verification</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
      <form [formGroup]="otpForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Enter OTP</mat-label>
          <input matInput formControlName="otp" maxlength="6" placeholder="000000">
          <mat-error *ngIf="otpForm.get('otp')?.hasError('required')">
            OTP is required
          </mat-error>
          <mat-error *ngIf="otpForm.get('otp')?.hasError('pattern')">
            OTP must be 6 digits
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-flat-button color="primary" (click)="onSubmit()" [disabled]="otpForm.invalid">
        Verify
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class OtpDialogComponent {
  otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.dialogRef.close(this.otpForm.value.otp);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
