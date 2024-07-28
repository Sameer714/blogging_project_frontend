import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupcredComponent } from '../popupcred/popupcred.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  bookId: any;
  responseData: any;
  token: any;
  createForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute, private http: HttpClient,private router: Router, private formBuilder: FormBuilder, private dialog : MatDialog ) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      blogTitle: ['', [Validators.required]],
      authorName: ['', [Validators.required, Validators.maxLength(220)]],
      launchDate: [''],
      aboutBlog: [''],
      content:['']
    });
  
    this.token = localStorage.getItem('jwtoken');
  }
  createred() {
    this.router.navigateByUrl('/create');
  }

  signuppop() {
    const popup = this.dialog.open(PopupcredComponent, {
      data: {
        message: "Create Account",
        status: 'signin'
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

  create() {
    if (this.createForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      const formData = this.createForm.value;

      this.http.post<any>('http://localhost:9092/v1/api/createblog', formData, { headers: headers })
        .subscribe(response => {
          this.responseData = response;
          console.log('Response from Create:', response);
            this.router.navigate(['/home']);
          
        }, error => {
          console.error('Error:', error);
        });
    }
  }
}
