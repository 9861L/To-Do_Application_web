import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginService } from '../services/loginService';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent {
  
  registerForm: any = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z \-\']+')]],
    lastName: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z \-\']+')]],
    phoneNumber: ['', [Validators.required,Validators.minLength(10), Validators.pattern('[789][0-9]{9}')]],
    emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    profileImg:['']


  });
  url: string = '../../assets/images/download.png';
  onFileSelected(file: any) {
    if (file.target.files) {
      const reader = new FileReader();

      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    const filedata = file.target.files[0];
  }

  constructor(private fb: FormBuilder, private router: Router, private service: LoginService, private _snackBar: MatSnackBar) { }
  onSubmit(): void {
    this.registerForm.value.profileImg = this.url;
    this.service.registerUser(this.registerForm.value).subscribe({
      next: (data) => {
        this._snackBar.open('you have Registered Successfully !!', 'success', {
          duration: 5000,
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        alert('EmailId Already Exists');
        this.registerForm.reset();
      },
    });
    this.registerForm.reset({});
  }

  reset() {
    this.registerForm.reset();
  }
}
