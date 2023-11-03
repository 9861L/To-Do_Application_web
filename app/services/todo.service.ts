import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../model/todo';
import { Observable } from 'rxjs';
import { USER } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //inject HttpClient service in constructor to call backend services
  constructor(private http: HttpClient) {}

  todoList:ToDo[]=[];

  //created addToDo()
  public addToDo(toDo: any): Observable<any> {
    return this.http.post<any>(`http://localhost:9005/toDo/user/addToDo`, toDo);
    
  }

  //created getAllToDo()
  public getAllToDo(): Observable<any> {
    return this.http.get<any>(`http://localhost:9005/toDo/user/getAllToDo`);
  }

  //created updateToDo()
  public updateToDo(toDo: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:9005/toDo/user/updateToDo`,
      toDo
    );
  }

  //created deleteToDoByTitle()
  public deleteToDoByTitle(title: any): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:9005/toDo/user/deleteToDoByTitle/${title}`
    );
  }

  //created getToDoByTitle()
  public getToDoByTitle(title: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getToDoByTitle/${title}`
    );
  }

  //create getAllListByPriority()
  public getAllListByPriority(priority: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getAllListByPriority/${priority}`
    );
  }

  //create getAllToDoByArchiveStatus()
  public getAllToDoByArchiveStatus(isArchive: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getAllToDoByArchiveStatus/${isArchive}`
    );
  }

  //create updateTaskArchiveStatus()
  public updateTaskArchiveStatus(toDo: ToDo): Observable<Array<ToDo>> {
    return this.http.put<Array<ToDo>>(
      `http://localhost:9005/toDo/user/updateTaskArchiveStatus`,
      toDo
    );
  }

  //create updateToDoStatus()
  public updateToDoStatus(toDo: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:9005/toDo/user/updateToDoStatus`,
      toDo
    );
  }

  //create getAllToDoByStatus()
  public getAllToDoByStatus(isCompleted: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getAllToDoByStatus/${isCompleted}`
    );
  }

  //create getAllToDoByStatus()
  public getToDoByImportantStatus(isCompleted: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getToDoByImportantStatus/${isCompleted}`
    );
  }

  //created deleteTaskByTitle()
  public deleteTaskByTitle(title: any): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:9005/toDo/user/deleteToDoByTitle/${title}`
    );
  }

  //created getAllNotification()
  public getAllNotification(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/notificationController/user/getAllNotification`
    );
  }

  //created deleteAllToDo()
  public deleteAllToDo(): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:9005/toDo/user/deleteAllToDo`
    );
  }

  public getToDOByCompletedStatus(isCompleted: boolean): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getAllToDoByStatus/${isCompleted}`
    );
  }

  //create updateTaskArchiveStatus()
  public updateTaskAsCompletedTask(toDo: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:9005/toDo/user/updateToDoAsCompletedTask`,
      toDo
    );
  }

  //create updateToDoAsImportantTask()
  public updateToDoAsImportantTask(toDo: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:9005/toDo/user/updateToDoAsImportantTask`,
      toDo
    );
  }

  //for send register message in gmail
  public sendSimpleEmail() {
    return this.http.get(`http://localhost:9005/user/sendSimpleEmail`);
  }

  //getCurrentUser
  public getCurrentUser(): Observable<USER> {
    return this.http.get<USER>(
      `http://localhost:9005/toDo/user/getUserDetails`
    );
  }
  public getToDOByDate(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:9005/toDo/user/getToDoByDate`
    );
  }
}
