import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupcredComponent } from '../popupcred/popupcred.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  responseData: any[] = []; 
  launchDate: string[] = []; 
  minDate: Date | undefined;
  role: any;
  token: any;
  loggedinUser :any;
  loading: boolean = false;
  blogTitle: any = [];
  authorName: any =[];
  aboutBlog: any = [];
  content: any = [];  
  username: any;
  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.username = localStorage.getItem('usernm');
    this.token = localStorage.getItem('jwtoken');
    this.role = localStorage.getItem('Role');
    this.loggedinUser = localStorage.getItem('usernm');
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

  changepass() {
    this.router.navigateByUrl('/change-pass')
    }

  Admin() {
    this.router.navigateByUrl('/users')
    }

  logout() {
    const popup = this.dialog.open(PopupComponent, {
      data: { 
        message: "Logged Out Successfully!",
        status: 'done'
      }
    });
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
