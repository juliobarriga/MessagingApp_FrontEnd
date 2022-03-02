import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ChatComponent } from './conversation/chat/chat.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  { 
    path: 'auth', component: AuthenticationComponent,
    children: [{ path: 'login', component: LoginComponent},{ path: 'register', component: RegisterComponent}]
  },
  { path: 'home', component: ConversationComponent,
    children: [{ path: 'chat/:secondId', component: ChatComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
