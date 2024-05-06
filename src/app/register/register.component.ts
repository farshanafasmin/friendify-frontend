import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private fb:FormBuilder,private route:Router,private ss:ServicesService, private toastr:ToastService){}

  ngOnInit(): void {
    
  }

  profile:any=""

  registerModel = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    profile:['',[Validators.required]]

  })

  getImage(event:any){

    let image=event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(image)

    fr.onload=(event:any)=>{
      this.profile=event.target.result
      console.log(this.profile);
      
    }

  }

  signup() {
    if (this.registerModel.valid) {
      var path = this.registerModel.value
      var userData = {
        username: path.username,
        email: path.email,
        password: path.password,
       profile:this.profile

      }
      console.log(userData);

      // this.ss.signup(userData).subscribe({
        this.ss.signup(userData).subscribe({
        next: (result: any) => {
          console.log(result);

          // alert(`${result.username} registered successfully...`);
          this.toastr.showSuccess(`${result.username} registered successfully...`)

          this.route.navigateByUrl('/login')
          this.registerModel.reset()

        },
        error: (result: any) => {
          // alert(result.error);
          this.toastr.showError(`${result.error}`)


        }
      })

    }
    else {
      // alert("invalid form")
      this.toastr.showError(`Invalid form`)

    }
  }
}
