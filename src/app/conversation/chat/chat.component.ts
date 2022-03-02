import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  form: FormGroup;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder,private router: Router) {
    this.form = this.formBuilder.group({
      message: ['']
    });
   }

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

  sendMessage(): void {
    console.log('calling sendMessage');
    console.log(this.form);
    if (this.form.value.message.length == 0){
      return;
    }

    this.userService.createMessageByReceiverId(this.userId,this.form.value).subscribe(data => {
      console.log(data);
    })
    this.form.reset();
    location.reload();
  }

}
