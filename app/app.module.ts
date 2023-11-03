import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

import { LoginComponent } from './loginComponent/login.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';


import {MatRadioModule} from '@angular/material/radio';
import { AddtodoComponent } from './addtodo/addtodo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewtodoComponent } from './viewtodo/viewtodo.component';
import { SearchtodoComponent } from './searchtodo/searchtodo.component';
import { NgToastModule } from 'ng-angular-popup';
import { HomeComponent } from './home/home.component';
import { ViewnotificationComponent } from './viewnotification/viewnotification.component';
import { ViewCompletedTodoComponent } from './view-completed-todo/view-completed-todo.component';
import { ViewImportantTodoComponent } from './view-important-todo/view-important-todo.component';
import { ViewArchiveTodoComponent } from './view-archive-todo/view-archive-todo.component';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { TodoByDateComponent } from './todo-by-date/todo-by-date.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponentComponent,
    HeaderComponent,
    InfoComponent,
    // ViewNotificationComponent,  
    AddtodoComponent,
    ViewtodoComponent,
    SearchtodoComponent,
    HomeComponent,
    ViewnotificationComponent,
    ViewCompletedTodoComponent,
    ViewImportantTodoComponent,
    ViewArchiveTodoComponent,
    ViewDialogComponent,
    UpdateTodoComponent,
    SplashScreenComponent,
    TodoByDateComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,MatSnackBarModule,MatTooltipModule,MatBadgeModule,MatPaginatorModule,
    NgxPaginationModule,
    NgToastModule
    
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
