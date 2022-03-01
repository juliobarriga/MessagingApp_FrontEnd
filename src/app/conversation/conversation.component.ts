import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  // messages: Message[] | undefined;
  messages: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages(): void {
    this.userService.getAllMessages().subscribe(
      (response: Message[]) => {
      this.messages = response;
      console.log(this.messages);
    })
  }

}
