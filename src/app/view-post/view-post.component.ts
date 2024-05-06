import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private ss: ServicesService, private route: Router, private toastr:ToastService) { }

  userPosts: any = [];

  ngOnInit(): void {

    this.allPost()
  }

  allPost() {
    const currentUserId = localStorage.getItem('currentUserId');

    // Fetch posts of the logged-in user
    if (currentUserId) {
      this.ss.getLuPost(currentUserId).subscribe({
        next: (result: any) => {
          this.userPosts = result;
          console.log(this.userPosts);
        },
        error: (error: any) => {
          console.error('Error fetching user posts:', error);
          // alert(error.error)
          this.toastr.showError(`${error.error}`)

        }
      });
    }
  }



  deletePost(id: any) {
    this.ss.deletePost(id).subscribe({
      next: (result: any) => {
        console.log(result);

        // alert(result)
        this.toastr.showSuccess(`${result}`)

        this.allPost()
      },
      error: (result: any) => {
        // alert(result.err1`or)
        this.toastr.showError(`${result.error}`)

      }

    })
  }


}