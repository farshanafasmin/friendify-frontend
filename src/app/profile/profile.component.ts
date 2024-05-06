import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  profilePic: string = "https://i.postimg.cc/y8vvZYhV/user-icon.webp";
  editClicked: boolean = false;
  totalPosts: number = 0;
  followedUsers:any=[]
  totalfollowing:any=0
  constructor(private ss: ServicesService, private route: Router, private toastr:ToastService) { }

  ngOnInit(): void {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      this.profilePic = storedProfilePic;
    }
    // Fetch the logged-in user details from localStorage
    const currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId) {
      this.ss.getProfile(currentUserId).subscribe({
        next: (result: any) => {
          this.user = result;
          console.log("Logged-in user:", this.user);

          // Call service method to fetch user posts
          this.ss.getLuPost(currentUserId).subscribe({
            next: (data: any) => {
              this.totalPosts = data.length;
              console.log("Total posts:", this.totalPosts);
            },
            error: (error: any) => {
              console.error("Error fetching user posts:", error);

            }
          });

          // to get following count
          
          this.ss.getFollowedUsers(currentUserId).subscribe({
            next: (followedUsers: any) => {
              this.followedUsers = followedUsers;
              this.totalfollowing=followedUsers.length
            },
            error: (error: any) => {
              console.error('Error fetching followed users:', error);
            }
          });
        },
        error: (error: any) => {
          console.error("Error fetching logged-in user profile:", error);
          // alert(error.message);
          this.toastr.showError(`${error.message}`)

        }
      });
    } else {

      console.error("No user logged in");
    }

  }

  editClick() {
    this.editClicked = true;
  }

  cancelEdit() {
    this.editClicked = false;
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.onload = (event: any) => {
      this.profilePic = event.target.result;
    };
  }

  editUser() {
    const userId = localStorage.getItem('currentUserId');
    console.log(`user id is ${userId}`);

    const updatedUserData = {
      email: this.user.email,
      password: this.user.password,
      profile: this.profilePic
    };

    this.ss.updateUserProfile(userId, updatedUserData).subscribe((result: any) => {
      console.log(result);
      this.user = result;
      this.cancelEdit();
      // alert('Profile Updated Successfully');
      this.toastr.showSuccess(`Profile updated successfully...`)

      this.ss.getProfile(userId)

      localStorage.setItem('profilePic', this.profilePic);
    });
  }

  postClick() {
    this.route.navigateByUrl('/view-post')
  }


}
