import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { ConversationComponent } from "./conversation.component";

const conversationRoutes: Routes = [
    {
        path: '', component: ConversationComponent,
        children: [{ path: 'chat/:secondId', component: ChatComponent}]
    }
];

@NgModule({
  imports: [RouterModule.forChild(conversationRoutes)],
  exports: [RouterModule]
})
export class ConversationRoutingModule { }
