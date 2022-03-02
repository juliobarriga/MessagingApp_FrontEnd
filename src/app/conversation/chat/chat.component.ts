import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/_models/message';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageList: Message[] = [];
  userId:any;
  userUserName:any;
  userPhoneNumber:any;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('secondId')|| 'error');
      
      this.userService.getSharedMessages(this.userId).subscribe(
        (resp: Message[]) => {
          this.messageList = resp;
          this.userPhoneNumber = this.tokenStorageService.getSecondId().phoneNumber;
          this.userUserName = this.tokenStorageService.getSecondId().userName;
          console.log(this.messageList);
        }
      )
    })
    
  }

}
