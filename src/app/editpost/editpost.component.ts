import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  constructor(private ss: ServicesService, private route: Router, private ar: ActivatedRoute) { }

  userPost: any =''; // Change to single post object

  id: any = '';

  files: string = '';

  ngOnInit(): void {
    this.ar.params.subscribe((params: any) => {
      this.id = params.id; // Get the id from route parameters
      this.ss.getSinglePost(this.id).subscribe({
        next: (result: any) => {
          this.userPost = result; // Assign single post object
          console.log(this.userPost);
          if (this.userPost.file) {
            this.files = this.userPost.file;
          }
        },
        error: (error: any) => {
          console.error('Error fetching user post:', error);
          alert(error.error);
        }
      });
    });
  }

  editpost() {
    if (this.userPost) {
      this.ss.updatePost(this.userPost._id, this.userPost).subscribe({
        next: (result: any) => {
          console.log(result);
          this.userPost = result;
          alert('Post Updated Successfully');
          this.route.navigateByUrl('/view-post');
        },
        error: (result: any) => {
          console.log(result.error);
          alert(result.error);
        }
      });
    }
  }
  cancel() {
    this.route.navigateByUrl('/view-post');
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.onload = (event: any) => {
      this.files = event.target.result;
      this.userPost.file = this.files;
    };
  }
}
