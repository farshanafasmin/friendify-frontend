import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private fb:FormBuilder, private route:Router, private ss:ServicesService, private toastr:ToastService){}

  ngOnInit(): void {
    
  }

  loginModel = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]

  })

  login() {

    if (this.loginModel.valid) {
      var path = this.loginModel.value
      var loginData = {
        email: path.email,
        password: path.password
      }

      this.ss.login(loginData).subscribe({

        next: (result: any) => {
          console.log(result);

          // alert(`${result.user.username} loginned successfully...`);
          this.toastr.showSuccess(`${result.user.username} loginned successfully...`)

          this.route.navigateByUrl("")
          this.loginModel.reset()
          localStorage.setItem("currentUser", result.user.username)
          localStorage.setItem("currentUserId", result.user._id)
         

          // store token 
          localStorage.setItem("token", result.token)

          this.route.navigateByUrl('/main')


        },
        error: (result: any) => {
          // alert(result.error);
          this.toastr.showError(`${result.error} `)


        }

      })

    }
    else {
      this.toastr.showError(`Invalid form`)
    }

  }
}
