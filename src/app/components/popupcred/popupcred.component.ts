import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-popupcred',
  templateUrl: './popupcred.component.html',
  styleUrls: ['./popupcred.component.scss']
})
export class PopupcredComponent {
  signupForm: FormGroup;
  passwordControl: any;
  loading: boolean = false;
  responseData: any[] = [];
  invalidCredentials = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupcredComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog : MatDialog,

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
      console.log('form', this.signupForm.value);
      this.http.post<any>('http://localhost:9092/v1/api/createuser', this.signupForm.value)
        .subscribe(response => {
          console.log('Response from server:', response);
          if(response.Success === "true"){
            const popup = this.dialog.open(PopupComponent, {
              data: {
                message: response.message,
                status: 'welcome'
              }
            });
            
          }
          else if (response.Success === "false"){
            const popup = this.dialog.open(PopupComponent, {
              data: {
                message: response.message,
                status: 'sed'
              }
            });
          }
        }, error => {
          console.error('Error:', error);
        });
    }
  }
  login(){
    this.loading = true;

    if (this.signupForm.valid) {
      if (this.status === 'login') {
        const gmail = this.signupForm.get('email')?.value;
        const passw = this.signupForm.get('pass')?.value;
        
        const payload = { gmail, passw };
        console.log('form', this.signupForm.value);
        this.http.post<any>('http://localhost:9092/auth/login', payload)
          .subscribe(response => {
            console.log('Response from server:', response);
  
            if (response.jwtoken) {
              localStorage.setItem('jwtoken', response.jwtoken);
              localStorage.setItem('Role', response.role);
              localStorage.setItem('usernm', response.usernm);
              localStorage.setItem('id', response.id);
  
              this.router.navigateByUrl('/home');
            } else if (response.usernm === "USER INACTIVE!") {
              const popup = this.dialog.open(PopupComponent, {
                data: { message: "The Account is inactive!" }
              });
              this.router.navigateByUrl('/login');
            } else {
              if (this.signupForm.get('passw')?.value != null) {
                this.signupForm.get('passw')?.setValue('');
              }
              this.invalidCredentials = true;
            }
          });


    }
  }
}
}