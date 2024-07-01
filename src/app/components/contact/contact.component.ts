import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm!:FormGroup;
  invalidCredentials = false;
  responseData: any[] = []; 
  launchDate: string[] = []; 
  minDate: Date | undefined;
  role: any;
  token: any;
  loggedinUser :any;
  loading: boolean = false;
  blogTitle: any = [];
  yourName: any =[];
  subject: any = [];
  content: any = [];  

  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog,private formBuilder: FormBuilder) {
    this.minDate = new Date();
  }

  create() {
    this.router.navigateByUrl('/create');
  }

  signuppop() {
    const popup = this.dialog.open(ContactComponent, {
      data: {
        message: "Create Account",
        status: 'signin'
      }
    });
  }

  loginpopup() {
    const popup = this.dialog.open(ContactComponent, {
      data: {
        message: "Log In",
        status: 'login'
      }
    });
  }

  contact(){
    if (this.contactForm.valid) {

      // API FOR SENDING THE CONTACT FORM

      // .................................................................................

      // console.log('form', this.contactForm.value);
      // this.http.post<any>('http://localhost:9092/auth/login', this.contactForm.value)
      //   .subscribe(response => {
      //     console.log('Response from server:', response);

      //     if (response.jwtoken) {
      //       localStorage.setItem('jwtoken', response.jwtoken);
      //       localStorage.setItem('Role', response.role);
      //       localStorage.setItem('usernm', response.usernm);
      //       localStorage.setItem('id', response.id);

      //       this.router.navigateByUrl('/home');
      //     } else if (response.usernm === "USER INACTIVE!") {
      //       const popup = this.dialog.open(ContactComponent, {
      //         data: { message: "The Account is inactive!" }
      //       });
      //       this.router.navigateByUrl('/login');
      //     } else {
      //       if (this.contactForm.get('passw')?.value != null) {
      //         this.contactForm.get('passw')?.setValue('');
      //       }
      //       this.invalidCredentials = true;
      //     }
      //   });
    }
  }
}