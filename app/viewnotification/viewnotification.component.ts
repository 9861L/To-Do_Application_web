import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-viewnotification',
  templateUrl: './viewnotification.component.html',
  styleUrls: ['./viewnotification.component.css'],
})
export class ViewnotificationComponent implements OnInit {
  //injecting todo service into constructor
  constructor(
    private todoService: TodoService,
    private toast: NgToastService
  ) {}

  notifications: any;
  p:any;
  totalLength:number = 0;

  ngOnInit(): void {
    this.todoService.getAllNotification().subscribe({
      next: (res) => {
        this.totalLength= res.length;
        this.notifications = res.jsonObject.notificationWithToDoList;
        console.log(this.notifications);
      },
      error: (err) => console.log(err + 'due to the network issue'),
    });
  }
}
