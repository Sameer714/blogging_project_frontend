import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupcredComponent } from '../popupcred/popupcred.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  trimmedString: any=[]; 
  username: any;

  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.username = localStorage.getItem('usernm');
    this.token = localStorage.getItem('jwtoken');
    this.role = localStorage.getItem('Role');
    this.loggedinUser = localStorage.getItem('usernm');
    this.getAllData();
  }

  getAllData() {
    this.loading = true;

    this.http.get<any>('http://localhost:9092/v1/api/getallblogs')
      .subscribe(response => {
        this.responseData = response; 
        console.log('Response from getall:', response);
        for(let res of response){
          this.blogTitle.push(res.blogTitle);
          this.authorName.push(res.authorName);
          this.content.push(res.content);
          this.aboutBlog.push(res.aboutBlog);
        }

        console.log('blog',this.blogTitle);
        console.log('blcontntog',this.content);
        this.loading = false;

      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });


  }

  create() {
    this.router.navigateByUrl('/create');
  }
  trim(content: string): string {
    return content.length > 50 ? content.slice(0, 50): content;
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

  delete(id: any) {
    console.log('id', id);
    const token = localStorage.getItem('jwtoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete<any>(`http://localhost:9092/v1/api/deletebyid/${id}`, { headers })
      .subscribe(response => {
        console.log('Delete Response:', response);
        this.getAllData();
      }, error => {
        console.error('Error:', error);
      });
  }

  update(id: any) {
    console.log('id', id);
    const token = localStorage.getItem('jwtoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put<any>(`http://localhost:9092/v1/api/update/${id}`,{ headers })
      .subscribe(response => {
        console.log('Update Response:', response);
      }, error => {
        console.error('Update Error:', error);
      });
  }

  navigateToData(bookId: string) {
    this.router.navigate(['/data', bookId]);
  }
}