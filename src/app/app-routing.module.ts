import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddpostComponent } from './addpost/addpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ViewFollowersComponent } from './view-followers/view-followers.component';
import { ViewFollowingComponent } from './view-following/view-following.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component:LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'add-post', component: AddpostComponent },
  { path: 'edit-post/:id', component: EditpostComponent },
  { path: 'edit-profile', component: ProfileComponent },
  {path:'main',component:MainComponent},
  {path:'view-post',component:ViewPostComponent},
  {path:'view-followers',component:ViewFollowersComponent},
  {path:'view-following',component:ViewFollowingComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
