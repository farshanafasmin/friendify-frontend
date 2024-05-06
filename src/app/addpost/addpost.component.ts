import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit{

  constructor(private fb:FormBuilder, private ss:ServicesService ,private route:Router, private toastr:ToastService){

  }

  ngOnInit(): void {
    
  }

  files:any=""
  fileType: string="";

  postModel = this.fb.group({
    pfile: ['', [Validators.required]],
    caption: ['',[Validators.required]]
  
  })

  getImage(event:any){

    let image=event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(image)

    fr.onload=(event:any)=>{
      this.files=event.target.result
      console.log(this.files);
      
    }

  }


  add(){
   
      if (this.postModel.valid) {
        var path = this.postModel.value
        var postData = {
          file: this.files,
          caption: path.caption,
        }
        console.log(postData);
  
          this.ss.addPost(postData).subscribe({
          next: (result: any) => {
            console.log(result);
  
            // alert(` post added successfully...`);
            this.toastr.showSuccess(`Post added successfully...`)

            this.route.navigateByUrl('/main')
            this.postModel.reset()
            localStorage.setItem("postId",result._id)
  
          },
          error: (result: any) => {
            // alert(result.error);
            this.toastr.showError(`${result.error}`)

  
          }
        })
  
      }
      else {
        // alert("invalid form")
        this.toastr.showError(`Please fill the form completely...`)

      }
    }
  }
