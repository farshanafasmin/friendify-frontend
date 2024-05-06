import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-view-following',
  templateUrl: './view-following.component.html',
  styleUrls: ['./view-following.component.css']
})
export class ViewFollowingComponent implements OnInit{

  constructor(private ss:ServicesService){}

 
  followedUsers: any[] = [];

  currentUserId: string | null = null;



  ngOnInit(): void {
      // Assuming you have the current user's ID stored in localStorage
      const currentUserId = localStorage.getItem("currentUserId");
    
      // Call the backend API to fetch followed users
      this.ss.getFollowedUsers(currentUserId).subscribe({
        next: (followedUsers: any) => {
          this.followedUsers = followedUsers;
        },
        error: (error: any) => {
          console.error('Error fetching followed users:', error);
        }
      });
    }

    unfollow(user: any) {
      console.log('User object:', user);
      // Check if user and username are defined
      if (user && user.username) {
          const unfollowUsername = user.username; // Username of the user to unfollow
  
          // Call the service method to unfollow the user
          this.ss.unfollowUser(unfollowUsername).subscribe({
              next: (response: any) => {
                  console.log(response.message);
                  user.following = !user.following; // Toggle follow status in the frontend
                  localStorage.setItem(`followStatus_${user.username}`, String(user.following)); // Update follow status in local storage
              },
              error: (error: any) => {
                  console.error('Error unfollowing user:', error);
              }
          });
      } else {
          console.error('User or username is undefined.');
      }
  }
  
  
  
}
