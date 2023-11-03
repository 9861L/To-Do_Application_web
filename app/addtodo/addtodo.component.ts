import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css'],
})
export class AddtodoComponent {
  isBoolean1:Boolean = true;
  isBoolean2:Boolean = false;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;


  panelOpenState = false;
  selectedFile: any = File;
 url: string = '../../assets/images/to-do-list.png';
//  url: string = '';

  constructor(
    private fb: FormBuilder,
    private toDoService: TodoService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService
  ) {}
  

  taskForm: any = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    isCompleted: [false],
    isArchive: [false],
    updatedTask: [''],
    createdDateTime: [''],
  });
  get title() {
    return this.taskForm.get('title');
  }
  get description() {
    return this.taskForm.get('description');
  }
  get priority() {
    return this.taskForm.get('priority');
  }
  get dueDate() {
    return this.taskForm.get('dueDate');
  }


  // getDateValidate(ac: AbstractControl) {
  //   let todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');
  //   let dateEntered = ac.value;

  //   if (dateEntered > todayDate) {
  //     return null;
  //   } else if (todayDate > dateEntered) {
  //     return { ErrorData1: true };
  //   } else {
  //     return null;
  //   }
  // }
  
  
  onSubmit() {
    console.table(this.taskForm.value);
    this.taskForm.value.imageUrl = this.url;
    // this.taskForm.value.dueDate.slice(0,10);
    // console.log(this.taskForm.value.dueDate.slice(0,10));
    // if (typeof this.taskForm.value.dueDate  === 'string') {
    //   const localDate = new Date(this.taskForm.value.dueDate);
    //   this.taskForm.value.dueDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
      
    // }
    
    const date = this.taskForm.value.dueDate.toString().slice(3, 15);
    
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    
    const convertedDate = `${year}-${month}-${day}`;
    
    this.taskForm.value.dueDate =convertedDate;
    
    this.toDoService.addToDo(this.taskForm.value).subscribe(
      (data) => {
        
        console.log(data);
        location.reload();
        // this.router.navigateByUrl('/login')
        this.toast.success({
          detail: 'ToDo added successfully',
          summary: 'DONE',
          duration: 8000,
          
        });

        this.router.navigateByUrl('home/header');
        // alert('Task added successfully');
      },
      (error) => {
        this.toast.error({
          detail: 'This ToDo Detail already present',
          summary: 'ERROR',
          duration: 4000,
        });
        //  alert('This task already exists');
        console.log(error);
      }
    );
  }

  

  //for update

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {  
      console.log(data);    
      let title = data.get('title') ?? '';
      console.log(title);
      if (title != '') {
        this.isBoolean1 = false;
        this.isBoolean2 = true;  

        this.toDoService.getToDoByTitle(title).subscribe((data) => {    
          console.log(this.url = data.imageUrl);     
          this.taskForm.setValue({
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
            createdDateTime: data.createdDateTime,

            imageUrl: this.url,
            isCompleted: data.completed,
            isArchive: data.archive,
            updatedTask: data.updatedTask,
          });
                
        });
      }
    });
  }

  updateToDo() {
    this.taskForm.value.imageUrl = this.url;

    this.toDoService.updateToDo(this.taskForm.value).subscribe({
      next: (data) => {        
        this.toast.success({
          detail: 'ToDo update successfully',
          summary: 'UPDATE',
          duration: 4000,
        });
        this.router.navigateByUrl('home/header');
      },

      error: (err) => {
        this.toast.error({
          detail: 'Due to the network issue',
          summary: 'ERROR',
          duration: 4000,
        });
      },
    });
  }
  todayDates: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');
}
