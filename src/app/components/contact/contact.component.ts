import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupcredComponent } from '../popupcred/popupcred.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
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
  ngOnInit(): void {
      this.contactForm = this.formBuilder.group({
        from: ['', [Validators.required, Validators.email]], 
        yourName: ['', Validators.required],
        subject: ['', [Validators.required, Validators.maxLength(220)]], 
        content: ['', Validators.required], 
      });
  }

  create() {
    this.router.navigateByUrl('/create');
  }

  signuppop() {
    const popup = this.dialog.open(PopupcredComponent, {
      data: {
        message: "Create Account",
        status: 'signup'
      }
    });
  }
  
  loginpopup() {
    const popup = this.dialog.open(PopupcredComponent, {
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