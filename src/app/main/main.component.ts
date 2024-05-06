import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  allPosts: any = [];
  filteredPosts: any = []; // Initialize filteredPosts array
  file: string = '';
  allUsers: any = [];
  currentUserId: string | null = null;
  username: string = ""
  followingUsers: any[] = [];
  commentText: string = ""; 
  currentUsername: string = ""; 

  constructor(private ss: ServicesService, private route:Router) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');

    // Fetch all posts
    this.ss.getPost().subscribe({
      next: (result: any) => {
        // Assign posts to allPosts array
        this.allPosts = result.map((post: any) => {
          // Initialize likeCount property
          post.likeCount = post.like.length;

          post.commentCount= post.comments.length

            // Assign comments to the post
        post.comments = post.comments.map((comment: any) => {
          comment.user = comment.user || {}; // Ensure user object exists
          return {
            username: comment.username,
            text: comment.comment,
            profile:comment.profile
          };
        });

          
          // Get like status from local storage
          const likeStatus = localStorage.getItem(`likeStatus_${post._id}`);
          post.likedByCurrentUser = likeStatus === 'true';
          
          // For each post, fetch user information and assign it
          this.ss.getUserById(post.userId).subscribe({
            next: (user: any) => {
              console.log('User fetched for post:', user);
              post.user = user; // Assign user information to post
            },
            error: (error: any) => {
              console.error('Error fetching user:', error);
            }
          });
          return post;
        });
        // Initialize filteredPosts array with all posts
        this.filteredPosts = this.allPosts;
      },
      error: (error: any) => {
        console.error('Error fetching posts:', error);
      }
    });

    // Fetch all users except the logged-in user
    this.ss.getAllUsers().subscribe({
      next: (result: any) => {
        // Filter out the logged-in user
        this.allUsers = result.filter((user: any) => user.id !== this.currentUserId);
        console.log(this.allUsers);

         // Retrieve follow status from local storage
        this.allUsers.forEach((user: any) => {
          const followStatus = localStorage.getItem(`followStatus_${user._id}`);
          if (followStatus === 'true') {
            user.following = true; // Set following status to true in the frontend
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.onload = (event: any) => {
      this.file = event.target.result;
    };
  }

  toggleFollow(user: any) {
    const followData = {
      userId: this.currentUserId,
      followUserId: user._id
    };

    this.ss.followUser(followData).subscribe({
      next: (response: any) => {
        console.log(response.message);
        user.following = !user.following; // Toggle follow status in the frontend
        localStorage.setItem(`followStatus_${user._id}`, String(user.following)); // Update follow status in local storage
      },
      error: (error: any) => {
        console.error('Error toggling follow:', error);
      }
    });
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("token");
    this.route.navigateByUrl('');
  }

  likePost(postId: string) {
    this.ss.likePost(postId, {}).subscribe({
      next: (response: any) => {
        console.log(response.message);
        const updatedPostIndex = this.allPosts.findIndex((post: any) => post._id === postId);
        if (updatedPostIndex !== -1) {
          this.allPosts[updatedPostIndex].likeCount = response.likeCount;
          this.allPosts[updatedPostIndex].likedByCurrentUser = response.likedByCurrentUser;
          console.log(response.likedByCurrentUser);

          // Update like status in local storage
          localStorage.setItem(`likeStatus_${postId}`, String(response.likedByCurrentUser));
        }
      },
      error: (error: any) => {
        console.error('Error liking post:', error);
      }
    });
  }

  applyFilter() {
    // Filter posts based on username
    this.filteredPosts = this.allPosts.filter((post: any) =>
      post.user.username.toLowerCase().includes(this.username.toLowerCase())
    );
  }

   // Function to add a comment to a post
   addComment(postId: string) {
    if (this.commentText.trim() === '') {
      return; // Do not add empty comments
    }
  
    const commentData = {
      comment: this.commentText,
      postid: postId,
      username:this.username,
      profile: this.allPosts.find((post:any) => post._id === postId)?.user?.profile // Get profile picture of the user who made the comment
    };

    console.log(commentData);
  
    this.ss.commentPost(postId, commentData).subscribe({
      next: (response: any) => {
        console.log('Comment added:', response);

        // Refresh the posts after adding the comment
        this.ngOnInit();
        // Clear the comment text
        this.commentText = '';
      },
      error: (error: any) => {
        console.error('Error adding comment:', error);
      }
    });
  }
}
