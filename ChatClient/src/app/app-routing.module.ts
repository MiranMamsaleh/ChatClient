import { FriendsComponent } from './components/friends/friends.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './components/chats/chats.component';


const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Chat',
    component: ChatComponent,
  },
  {
    path: 'Chats',
    component: ChatsComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Friends',
    component: FriendsComponent
  },
  {
    path: '',
    redirectTo: 'Register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
