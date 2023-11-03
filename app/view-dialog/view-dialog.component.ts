import { Component } from '@angular/core';
import { ToDo } from '../model/todo';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ViewtodoComponent } from '../viewtodo/viewtodo.component';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent {
  p:any;
  showMore: boolean = false;
  panelOpenState = false;
  // allToDO: ToDo[] = [];
  card:ToDo = {};

  // value: boolean = false;
  // isVisible() {
  //   this.value = !this.value;
  // }

  constructor(
    private toDoService: TodoService,
    private userService: LoginService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
 // this.dialogRef.updatePosition({ top: '25px', left: '25px', right:'25px', bottom:'25px' });
 this.ar.paramMap.subscribe(data=>{
  console.log(data);    
  let title = data.get('title') ?? '';
  console.log(title);
  if (title != '') {
    this.toDoService.getToDoByTitle(title).subscribe(data => this.card = data);
  }
 })
    // this.toDoService
    //   .getCurrentUser()
    //   .subscribe((data) => console.log(data.lastName));
    // //called getAllToDo() method
    // this.getAllToDo();
  }

 
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        // this.getAllToDo();
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
