import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('this is all messages',this.userService.getAllMessages());
  }

}
