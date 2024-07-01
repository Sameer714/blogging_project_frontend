import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popupcred',
  templateUrl: './popupcred.component.html',
  styleUrls: ['./popupcred.component.scss']
})
export class PopupcredComponent {
  signupForm: FormGroup;
  passwordControl: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupcredComponent>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(5)]],
      name: [''],
      userName: ['']
    });

    this.passwordControl = this.signupForm.get('pass');
  }

  close() {
    this.dialogRef.close();
  }

  get message(): string {
    return this.data.message;
  }

  get status(): string {
    return this.data.status;
  }

  signup() {
    if (this.signupForm.valid) {
      if (this.status === 'signin') {
        // Handle signup logic
      } else {
        // Handle login logic
      }
    }
  }
}
