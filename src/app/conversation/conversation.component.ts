import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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


  messages: Message[] = [];
  mainUser = this.tokenStorageService.getUserInfo();
  users:any[] = [];
  tempMessages: Message[] = [];
  allUsers:User[] = [];
  form: FormGroup;
  isSubmitted = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router, private route:ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedUser : [ '', [ Validators.required]],
    }) 
   }

  getMessages(id:number):void {
    console.log('calling getMessages function')
    console.log(id);
    this.tokenStorageService.setReceiverId(id,this.users.find(i => i.id === id).userName, this.users.find(i => i.id === id).phoneNumber);
    this.router.navigateByUrl(`/home/chat/${this.tokenStorageService.getSecondId().id}`)
    console.log(this.tokenStorageService.getSecondId())
    // this.tempMessages = this.users.find(i => i.id === id).messages;
    // console.log(this.users)
    // console.log('length of tempMessages',this.tempMessages.length)
    // console.log('tempMessages',this.tempMessages)
  }

  selectUser(): void {
    console.log(this.form);
    this.isSubmitted = true;
    if (!this.form.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.form.value.id));
    }
  }
  
  get userId(){
    return this.form.get('id');
  }

  changeSelectedUser(e: any) {
    this.userId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void {
    if(!this.tokenStorageService.getLoginStatus()){
      this.router.navigateByUrl('/auth/login')
      return
    }

    this.userService.getAllMessages().subscribe(
      (response: Message[]) => {
      this.users = response.map((message:any) => {
        if (this.mainUser.id === message.receiver.id){
          this.userService.getSharedMessages(message.sender.id).subscribe(
            (res: Message[]) => {
              message.sender.messages = res;
              // console.log(message.sender.messages);
            }
          )
          // message.sender['messages']= this.getSharedMessages(message.sender.id);
          return message.sender
        } else {
          this.userService.getSharedMessages(message.receiver.id).subscribe(
            (res: Message[]) => {
              message.receiver.messages = res;
              // console.log(message.receiver.messages);
            }
          )
          // message.receiver['messages'] = this.getSharedMessages(message.receiver.id);
          return message.receiver
        }
      });
      this.users = this.users.reduce((unique:any, o: any) => {
        if(!unique.some((obj:any) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);
      console.log(this.users)
    })
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.allUsers = response;
        console.log(this.allUsers);
        let removeIndex = this.allUsers.map(obj => obj.id).indexOf(this.mainUser.id);
        ~removeIndex && this.allUsers.splice(removeIndex,1);
        console.log(this.allUsers)
      }
    )
    console.log(this.mainUser);
    
  }

  logout():void {
    console.log('calling logout')
    this.tokenStorageService.logout();
    this.router.navigateByUrl('/auth/login')
  }
  // getSharedMessages(seconUserId:number):any {
  //   this.userService.getSharedMessages(seconUserId).pipe(debounceTime(500)).subscribe(
  //     (res: Message[]) => {
  //       this.tempMessages = res;
  //       console.log(this.tempMessages);
  //     }
  //   )
  // }
}
