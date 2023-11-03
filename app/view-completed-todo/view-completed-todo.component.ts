import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToDo } from '../model/todo';

@Component({
  selector: 'app-view-completed-todo',
  templateUrl: './view-completed-todo.component.html',
  styleUrls: ['./view-completed-todo.component.css']
})
export class ViewCompletedTodoComponent {
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
    this.getToDOByCompletedStatus(true);
    
  }
  getToDOByCompletedStatus(completed: boolean) {
    this.toDoService.getToDOByCompletedStatus(completed).subscribe((data) => {
      this.allToDO = data;
      if (!(this.allToDO == null || this.allToDO.length == 0)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }     
    });
  }
  // updateTaskArchiveStatus(card: any) {
  //   this.toDoService.updateTaskArchiveStatus(card).subscribe();
  // }

  // //created updateTaskAsCompletedTask()
  // updateTaskAsCompletedTask(card: any) {       
  //   this.toDoService.updateTaskAsCompletedTask(card).subscribe(()=> this.getToDOByCompletedStatus(true));
  // }

  // //created updateToDoAsImportantTask()
  // updateToDoAsImportantTask(card: any) {
  //   this.toDoService.updateToDoAsImportantTask(card).subscribe();
  // }

  //created updateTaskArchiveStatus()
  updateTaskArchiveStatus(card: any) {
    this.toDoService
      .updateTaskArchiveStatus(card)
      .subscribe({
        next: ()=>{
          this.getToDOByCompletedStatus(true);
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
        this.getToDOByCompletedStatus(true);
        this.toast.success({
          detail: 'Completed ToDo Is Remove',
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
        this.toast.success({
          detail: 'Important ToDo Is Added',
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
  p:any;

  //delete todo
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        this.getToDOByCompletedStatus(true);
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
      this.getToDOByCompletedStatus(true);
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
      this.getToDOByCompletedStatus(true);
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
