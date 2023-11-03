import { Component, OnInit } from '@angular/core';
import { ToDo } from '../model/todo';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-view-important-todo',
  templateUrl: './view-important-todo.component.html',
  styleUrls: ['./view-important-todo.component.css']
})
export class ViewImportantTodoComponent implements OnInit{
  allToDO: ToDo[] = []; 
  showMessage: boolean = true;
  constructor(
    private toDoService: TodoService,
    private userService: LoginService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void { 
    //created getToDoByImportantStatus()
    this.getToDoByImportantStatus(true);
  }
  getToDoByImportantStatus(important: boolean) {
    this.toDoService.getToDoByImportantStatus(important).subscribe((data) => {
      this.allToDO = data.filter( (a: { completed: boolean; }) => a.completed == false);;
      if (!(this.allToDO == null || this.allToDO.length == 0)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }     
    });
  }
  p:any;
  // updateTaskArchiveStatus(card: any) {
  //   this.toDoService.updateTaskArchiveStatus(card).subscribe();
  // }

  // //created updateTaskAsCompletedTask()
  // updateTaskAsCompletedTask(card: any) {
  //   this.toDoService.updateTaskAsCompletedTask(card).subscribe();
  // }

  // //created updateToDoAsImportantTask()
  // updateToDoAsImportantTask(card: any) {
  //   this.toDoService.updateToDoAsImportantTask(card).subscribe(()=> this.getToDoByImportantStatus(true))
  // }

  //created updateTaskArchiveStatus()
  updateTaskArchiveStatus(card: any) {
    this.toDoService
      .updateTaskArchiveStatus(card)
      .subscribe({
        next: ()=>{
          this.toast.success({
            detail: 'Archive ToDo Is Added',
            summary: 'Added',
            duration: 4000,
          });
        },
        error: (err)=>{
          this.toast.success({
            detail: 'due to the network issues',
            summary: 'Error',
            duration: 4000,
          });
        }
      });
  }

  //created updateTaskAsCompletedTask()
  updateTaskAsCompletedTask(card: any) {
    this.toDoService.updateTaskAsCompletedTask(card).subscribe({
      next: ()=>{
        this.getToDoByImportantStatus(true);
        this.toast.success({
          detail: 'Completed ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err)=>{
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      }
    });
        } 
  

  //created updateToDoAsImportantTask()
  updateToDoAsImportantTask(card: any) {
    this.toDoService.updateToDoAsImportantTask(card).subscribe({
      next: ()=>{
        this.getToDoByImportantStatus(true);
        this.toast.success({
          detail: 'Important ToDo Is Remove',
          summary: 'Remove',
          duration: 4000,
        });
      },
      error: (err)=>{
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      }
    });
  }

  //delete todo
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        this.getToDoByImportantStatus(true);
        this.toast.success({
          detail: 'ToDo Deleted successfully',
          summary: 'DELETED',
          duration: 4000,
        });
        this.allToDO;
      },
      error: err =>  this.toast.error({
        detail: 'Due to the network issue toDo is not deleted',
        summary: 'ERROR',
        duration: 4000,
      })
    });
  }
  search(title: string) {
    if (title === '' || !title) {
      this.getToDoByImportantStatus(true);
    } else {
      // this.toDoService
      //   .getToDoByTitle(title)
      //   .subscribe((data) => (this.allToDO = data));
      this.allToDO = this.allToDO;
      this.allToDO = this.allToDO.filter(
        (data) =>
          data.title?.includes(title) || data.description?.includes(title)
      );
    }
  }

  filter(priority: string) {
    if (priority == '') {
      this.getToDoByImportantStatus(true);
    } else {
      this.toDoService
        .getAllListByPriority(priority)
        .subscribe((data) => (this.allToDO = data));
    }
  }

  completionStatus(isCompleted: boolean) {
    this.toDoService.getToDOByCompletedStatus(isCompleted).subscribe((data) => {
      this.allToDO = data;
    });
  }
}
