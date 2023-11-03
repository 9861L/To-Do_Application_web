import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/loginService';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: any = this.fb.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  login: any;
  onSubmit(): void {
    console.table(this.loginForm.value);

    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        this.login=data;
        //here set token in localStorage
        this.loginService.setToken(this.login.jwtToken)
        console.log(this.loginService.getToken+" updated");
        
         localStorage.setItem("jwtToken",data.jwtToken)

        //here called the sendSimpleEmail
      //  this.todoService.sendSimpleEmail().subscribe();

        //set current user in local storage
        this.todoService.getCurrentUser().subscribe((data) =>this.loginService.setUser(data));

        this.router.navigateByUrl('home/header');
        this.snackBar.open('Successfully LoggedIn !!', 'success', {
          duration: 5000,
        });
      },
      error: (error) => {
        this.snackBar.open('Try with valid Credentials', 'error', {
          duration: 5000,
        });
     //   this.loginForm.reset();
      },
    });
  //  this.loginForm.reset({});
  }
}
