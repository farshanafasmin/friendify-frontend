import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  Base_url = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  signup(bodyData: any) {
    return this.http.post(`${this.Base_url}/add-new-user`, bodyData)
  }

  login(bodyData: any) {
    return this.http.post(`${this.Base_url}/login`, bodyData)
  }
  
  accessTokenHeader(){
    // create header
    var headers=new HttpHeaders()

    // check whether the token is present in local storage

    if(localStorage.getItem("token")){
      // store token in a variable
      const token=localStorage.getItem("token")

      var headers=headers.append("access_token",`Bearer ${token}`) //variable name should be same overloaded variable
    }
    return {headers} //should return as obj
  }

  getProfile(id:any){
    return this.http.get(`${this.Base_url}/get-profile/${id}`,this.accessTokenHeader())
  }

  updateUserProfile(userId: any, bodyData: any) {
    return this.http.put(`${this.Base_url}/edit-profile/${userId}`, bodyData,this.accessTokenHeader());
  }

  addPost(bodyData:any){
    return this.http.post(`${this.Base_url}/add-post`,bodyData,this.accessTokenHeader())
  }

  updatePost(postId: any, bodyData: any) {
    return this.http.put(`${this.Base_url}/edit-post/${postId}`, bodyData,this.accessTokenHeader());
  }
  
  getPost(){
    return this.http.get(`${this.Base_url}/get-all-post`,this.accessTokenHeader())
  }

  
  getAllUsers(){
    return this.http.get(`${this.Base_url}/get-all-users`,this.accessTokenHeader())
  }


  getUserById(userId: any) {
    return this.http.get(`${this.Base_url}/get-user-byid/${userId}`, this.accessTokenHeader());
  }

  getLuPost(uid: any) {
    return this.http.get(`${this.Base_url}/get-lu-post/${uid}`, this.accessTokenHeader());
  }

  getSinglePost(postId:any){
    return this.http.get(`${this.Base_url}/get-single-post/${postId}`, this.accessTokenHeader());

  }

  likePost(postId: any, bodyData: any) {
    return this.http.put(`${this.Base_url}/like-post/${postId}`, bodyData,this.accessTokenHeader());
  }

  deletePost(postId:any){
    return this.http.delete(`${this.Base_url}/delete-post/${postId}`,this.accessTokenHeader())
  }

  followUser(id: any) {
    const followData = {
      userId: localStorage.getItem('currentUserId'),
      followUserId: id
    };
  
    return this.http.post(`${this.Base_url}/follow-user/${id}`, followData, this.accessTokenHeader())
  }
  

  getFollowedUsers(userId: any) {
    return this.http.get(`${this.Base_url}/get-followers/${userId}`, this.accessTokenHeader());
  }
  
  unfollowUser(unfollowUsername: string) {
    return this.http.delete(`${this.Base_url}/unfollow-user/${unfollowUsername}`, this.accessTokenHeader());
}

commentPost(postId: string, bodyData: any) {
  return this.http.put(`${this.Base_url}/comment-post/${postId}`, bodyData, this.accessTokenHeader());
}


}
