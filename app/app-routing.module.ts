import { NgModule } from '@angular/core';
import { LoginComponent } from './loginComponent/login.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { InfoComponent } from './info/info.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { SearchtodoComponent } from './searchtodo/searchtodo.component';
import { HomeComponent } from './home/home.component';
import { ViewnotificationComponent } from './viewnotification/viewnotification.component';
import { ViewtodoComponent } from './viewtodo/viewtodo.component';
import { authGuard } from './guard/auth.guard';
import { ViewArchiveTodoComponent } from './view-archive-todo/view-archive-todo.component';
import { ViewCompletedTodoComponent } from './view-completed-todo/view-completed-todo.component';
import { ViewImportantTodoComponent } from './view-important-todo/view-important-todo.component';
import { registerGuard } from './guard/register.guard';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { TodoByDateComponent } from './todo-by-date/todo-by-date.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'notification', component: ViewnotificationComponent },
      { path: 'addToDo/:title', component: AddtodoComponent },
      {path:'updateToDo/:title',component:UpdateTodoComponent},
      { path: 'header', component: HeaderComponent },
      // { path: 'header/:title', component: HeaderComponent },
      { path: 'viewtodo', component: ViewtodoComponent },
      { path: 'viewarchive', component: ViewArchiveTodoComponent },  
      { path: 'viewcompleted', component: ViewCompletedTodoComponent },
      { path: 'viewimportant', component: ViewImportantTodoComponent },
      { path: 'todobydate', component: TodoByDateComponent },
      { path: 'search', component: SearchtodoComponent },

    ],
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponentComponent ,canActivate:[registerGuard]},  
  { path: 'login', component: LoginComponent,canActivate:[registerGuard] },
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
