import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  // messages: Message[] | undefined;
  messages: any;
  users:any;
  conversations= new Map<number, User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllMessages();
    console.log(typeof this.messages);
    // console.log(typeof this.users);
    // this.users = this.messages[1].receiver;
    // console.log(this.users)

  }

  getAllMessages(): void {
    this.userService.getAllMessages().subscribe(
      (response: Message[]) => {
      this.messages = response;
      console.log(this.messages);
    })
  }

}
