import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

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
    const popup = this.dialog.open(AboutComponent, {
      data: {
        message: "Create Account",
        status: 'signin'
      }
    });
  }

  loginpopup() {
    const popup = this.dialog.open(AboutComponent, {
      data: {
        message: "Log In",
        status: 'login'
      }
    });
  }

}
