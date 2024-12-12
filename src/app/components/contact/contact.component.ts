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
  username: any;

  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog,private formBuilder: FormBuilder) {
    this.minDate = new Date();
  }
  ngOnInit(): void {
      this.username = localStorage.getItem('usernm');
      this.contactForm = this.formBuilder.group({
        from: ['', [Validators.required, Validators.email]], 
        name: ['', Validators.required],
        sub: ['', [Validators.required, Validators.maxLength(220)]], 
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
      console.log('form', this.contactForm.value);
      this.http.post<any>('http://localhost:9092/v2/api/send', this.contactForm.value)
        .subscribe(response => {
          console.log('Response from server:', response);
          if(response === "success" ){
            
          }
        })
    }
    
  }
}
