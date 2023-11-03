import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ToDo } from '../model/todo';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';

@Component({
  selector: 'app-todo-by-date',
  templateUrl: './todo-by-date.component.html',
  styleUrls: ['./todo-by-date.component.css']
})
export class TodoByDateComponent implements OnInit {

  constructor(
    private toDoService: TodoService,
    private userService: LoginService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService,
    public dialog: MatDialog
  ) {}
  allToDo:ToDo[]=[];
  ngOnInit(): void {
    this.getAllToDo();
  }
  searchedDueDate:string =""

  @Output()
 sendData:EventEmitter<any>=new EventEmitter();
 searchinput(){
  this.sendData.emit(this.searchedDueDate);
 }

  //create category wise priority method
  isHighPriority = (allToDO: any): boolean => allToDO.priority === 'high';
  isMediumPriority = (allToDO: any): boolean => allToDO.priority === 'medium';
  isLowPriority = (allToDO: any): boolean => allToDO.priority === 'low';

  
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        this.getAllToDo();
        this.toast.success({
          detail: 'ToDo Deleted successfully',
          summary: 'DELETED',
          duration: 4000,
        });
      },
      error: (err) =>
        this.toast.error({
          detail: 'Due to the network issue toDo is not deleted',
          summary: 'ERROR',
          duration: 4000,
        }),
    });
  }

  addToDo() {
    this.router.navigateByUrl('home/addToDo/');
  }

  search(title: string) {
    if (title === '' || !title) {
      this.getAllToDo();
    } else {
     
      this.allToDo = this.allToDo;
      this.allToDo = this.allToDo.filter(
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
        .subscribe((data) => (this.allToDo = data));
    }
  }

  completionStatus(isCompleted: boolean) {
    this.toDoService.getToDOByCompletedStatus(isCompleted).subscribe((data) => {
      this.allToDo = data;
    });
  }
  showMessage:boolean=false;

  //created getAllToDo()
  getAllToDo() {
    this.toDoService.getToDOByDate().subscribe((data) => {
    
      this.allToDo = data.filter( (a: { completed: boolean; }) => a.completed == false);
      if (!(this.allToDo == null || this.allToDo.length == 0)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    });
  }
  p:any;

  //created updateTaskArchiveStatus()
  updateTaskArchiveStatus(card: any) {
    this.toDoService.updateTaskArchiveStatus(card).subscribe({
      next: (data) => {      

        this.toast.success({
          detail: 'Archive ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }

  //created updateTaskAsCompletedTask()
  updateTaskAsCompletedTask(card: any) {
    this.toDoService.updateTaskAsCompletedTask(card).subscribe({
      next: () => {
        this.getAllToDo();
        this.toast.success({
          detail: 'Completed ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }

  //created updateToDoAsImportantTask()
  updateToDoAsImportantTask(card: any) {
    this.toDoService.updateToDoAsImportantTask(card).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Important ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }



  


}
