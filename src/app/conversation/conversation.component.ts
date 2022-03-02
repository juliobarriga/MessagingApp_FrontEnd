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
  messages: Message[] = [];
  mainUser = this.tokenStorageService.getUserInfo();
  users:any[] = [];
  conversations: any;
  tempMessages: Message[] = [];

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllMessages();
    console.log(this.mainUser);
    console.log(this.messages)
  }
  
  saveConversartions(array:any):void {
    this.conversations = array;
  }

  getAllMessages(): any {
    this.userService.getAllMessages().subscribe(
      (response: Message[]) => {
      this.messages = response;
      console.log(this.messages);
      this.getUsers(this.messages);
    })
    // this.getUsers();
  }

  getMessagesBySenderId(senderId: number):any {
    this.userService.getMessagesBySenderId(senderId).subscribe(
      (response: Message[]) => {
      this.tempMessages =  response;
      this.getMessagesByReceiverId(senderId)
      // console.log('typeof:', typeof this.tempMessages)
      // console.log(`first length for ${senderId}`,this.tempMessages.length)
    })
  }

  getMessagesByReceiverId(receiverId:number):any {
    this.userService.getMessagesByReceiverId(receiverId).subscribe(
      (response: Message[]) => {
      this.tempMessages.push(...response)
      // console.log('unsorted array', this.tempMessages)
      this.tempMessages.sort(function(a:any,b:any): any{return Date.parse(b.date) - Date.parse(a.date);})
      // this.tempMessages.sort(function(a:any,b:any): any{return b.date.getTime() - a.date.getTime();})
      // console.log(`second length for ${receiverId}`,this.tempMessages.length);
      // console.log('sorted array', this.tempMessages)
      // this.userService.setMessages(this.tempMessages);
      // console.log(this.userService.getMessages());
      return this.tempMessages;
    })
  }

  getUsers(messages:Message[]): void {
    console.log(this.messages)
    this.users = messages.map(message => {
      if (this.mainUser.id === message.receiver.id){
        // console.log(this.userService.getMessages());
        // console.log(typeof this.getMessagesBySenderId(message.sender.id))
        let userObject: any = {
          id: message.sender.id,
          phoneNumber: message.sender.phoneNumber,
          birthDate: message.sender.birthDate,
          userName: message.sender.userName,
          messages: this.getMessagesBySenderId(message.sender.id)
          // messages: this.getMessagesBySenderId(message.sender.id).sort(function(a:any,b:any): any{return Date.parse(b.date) - Date.parse(a.date);})
        }
        return userObject;
        // return {
        //   id: message.sender.id,
        //   phoneNumber: message.sender.phoneNumber,
        //   birthDate: message.sender.birthDate,
        //   userName: message.sender.userName,
        //   messages: this.getMessagesBySenderId(message.sender.id)
        //   // messages: this.getMessagesBySenderId(message.sender.id).sort(function(a:any,b:any): any{return Date.parse(b.date) - Date.parse(a.date);})
        // }
        // return message.sender;
      } else {
        return {
          id: message.receiver.id,
          phoneNumber: message.receiver.phoneNumber,
          birthDate: message.receiver.birthDate,
          userName: message.receiver.userName,
          messages: this.getMessagesBySenderId(message.receiver.id)
          // messages: this.getMessagesBySenderId(message.receiver.id).sort(function(a:any,b:any): any{return b.date.getTime() - a.date.getTime();})
        }
        // return message.receiver;
      }
    });
    console.log(this.users)
    this.users = this.users.reduce((unique:any, o: any) => {
      if(!unique.some((obj:any) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
  },[]);
    // this.users = this.users.map((v:any) => ({...v, messages:[]}));

    // console.log(typeof this.mainUser.id)
    // this.userService.getMessagesByReceiverId(this.mainUser.id).subscribe(
    //   (response: Message[]) => {
    //   this.tempMessages = response;
    //   console.log(this.tempMessages);
    // })

    console.log(this.users)
    this.userService.setConversations(this.users);
    this.saveConversartions(this.users);
    console.log(this.userService.getConversations());
  }

  

}
