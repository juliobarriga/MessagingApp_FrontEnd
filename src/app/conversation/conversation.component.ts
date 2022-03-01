import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  // messages: Message[] | undefined;
  messages: any;
  mainUser = this.tokenStorageService.getUserInfo();
  users:any;
  conversations: any;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllMessages();
    console.log(this.mainUser);
  }

  getAllMessages(): void {
    this.userService.getAllMessages().subscribe(
      (response: Message[]) => {
      this.messages = response;
      console.log(this.messages);
      this.getUsers(this.messages);
    })
    
    // this.getUsers();
  }

  getUsers(messages:Message[]): any {
    this.users = messages.map(message => {
      if (this.mainUser.id == message.receiver.id){
        return message.sender;
      } else {
        return message.receiver;
      }
    });
    this.users = this.users.reduce((unique:any, o: any) => {
      if(!unique.some((obj:any) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
  },[]);
    console.log(this.users)
  }

  

}
