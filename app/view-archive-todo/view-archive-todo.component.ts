import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToDo } from '../model/todo';

@Component({
  selector: 'app-view-archive-todo',
  templateUrl: './view-archive-todo.component.html',
  styleUrls: ['./view-archive-todo.component.css'],
})
export class ViewArchiveTodoComponent implements OnInit {
  allToDO: ToDo[] = [];
  p:any;
  constructor(
    private toDoService: TodoService,
    private userService: LoginService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    //created getAllToDoByArchiveStatus()
    this.getAllToDoByArchiveStatus(true);
  }

  //created getAllToDo()
  getAllToDoByArchiveStatus(archive: boolean) {
    this.toDoService.getAllToDoByArchiveStatus(archive).subscribe((data) => {
      this.allToDO = data;
     
    });
  }

 
  //created updateTaskArchiveStatus()
  updateTaskArchiveStatus(card: any) {
    this.toDoService
      .updateTaskArchiveStatus(card)
      .subscribe({
        next: ()=>{
          this.getAllToDoByArchiveStatus(true);
          this.toast.success({
            detail: 'Archive ToDo Is Remove',
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

  //created updateTaskAsCompletedTask()
  updateTaskAsCompletedTask(card: any) {
    this.toDoService.updateTaskAsCompletedTask(card).subscribe({
      next: ()=>{
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

  //delete todo
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        this.getAllToDoByArchiveStatus(true);
        this.toast.success({
          detail: 'ToDo Deleted successfully',
          summary: 'DELETED',
          duration: 4000,
        });
        this.allToDO;
      },
      error: (err) =>
        this.toast.error({
          detail: 'Due to the network issue toDo is not deleted',
          summary: 'ERROR',
          duration: 4000,
        }),
    });
  }
 
  
  search(title: string) {
    if (title === '' || !title) {
      this.getAllToDo();
    } else {
     
      this.allToDO = this.allToDO;
      this.allToDO = this.allToDO.filter(
        (data) =>
          data.title?.toLocaleLowerCase().includes(title) || data.description?.toLocaleLowerCase().includes(title)
      );
    }
  }


  filter(priority: string) {
    if (priority == '') {
      this.getAllToDo();
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

  //created getAllToDo()
  getAllToDo() {
    this.toDoService.getAllToDo().subscribe((data) => {
      this.allToDO = data;
      console.log('get all todolist');
      console.table(this.allToDO);
    });
  }

  
}
