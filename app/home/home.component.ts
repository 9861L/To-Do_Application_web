import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { NgToastService } from 'ng-angular-popup';
import { USER } from '../model/user';
import { ToDo } from '../model/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @ViewChild(MatSidenav)
  // sidenav!: MatSidenav;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private toDoService: TodoService,
    public loginService: LoginService,
    private toast: NgToastService
  ) {}
  allToDO:ToDo[]=[];

  // isLoggedIn: boolean = false;
  // user: any;
  totalLength:number=0;
  notifications:any[]=[];
  ngOnInit(): void {
     //set current user in local storage
    //  this.toDoService.getCurrentUser().subscribe((data) => this.user = data);
    //  console.log(this.user.firstName);
    this.getAllToDo()
    console.log(this.loginService.getToken);  
   
  }
  toDayTask(){
    this.router.navigateByUrl('/home/todobydate')
  }
  getAllToDo(){
    this.toDoService.getAllToDo().subscribe((data) => {
     
      
      this.allToDO = data;
      this.totalLength=this.allToDO.length;
      // alert(this.totalLength)
    }
    );
  }
  notification(){
    this.router.navigateByUrl('/home/notification');
    this.totalLength=0;
  }
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
  
    reload(){
      location.reload();
    }


  // ngAfterViewInit() {
  //   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }

  addTodo() {
    this.router.navigateByUrl('home/addToDo/');
  }

  //created deleteAllToDo()
  deleteAllToDo() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all tasks?'
    );
    if (confirmed) {
      this.toDoService.deleteAllToDo().subscribe({
        next: (data) => {
          this.toast.success({
            detail: 'AllToDo Deleted successfully',
            summary: 'AllToDo Deleted successfully',
            duration: 4000,
          });
        },
        error: (err) =>
          this.toast.error({
            detail: 'Due to the network issue All toDo is not deleted',
            summary: 'ERROR',
            duration: 4000,
          }),
      });
    }
  }

  logOut() {
    this.loginService.logout();
    // this.router.navigateByUrl("login")
     window.location.reload();
  }
  

 
}
