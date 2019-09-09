import { Component, OnInit,AfterViewInit} from '@angular/core';
import {ApiServiceService} from '../api-service.service';
import{ChatApp} from '../chat-app';
 import{Message} from '../message';
 import{GetMessages} from '../get-messages'
  import { from } from 'rxjs';
  import{AdminMessage} from '../admin-message'
  import{Notifications} from '../notifications';
  import{GetNotiications} from '../get-notiications'
  import{Referid} from '../referid'
  
  declare var $: any;
 
@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit,AfterViewInit {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
public chatList:Message[];
public chatopen:boolean=false;
public  username:string='';
public chatArray=[];
public adminChat:AdminMessage[];
public messageData:string;
public  isSent:boolean=true;
public isRecieve:boolean=false;
public notifications:Notifications[];
public textArea:string
public reply:GetMessages[]
public chatid:any
public afterSent:boolean=true;
public isOpen:boolean=true; 
public unReadMessages:GetNotiications[]
public notificationsArray=[];
public referidArray=[]
public referid:Referid[]
public isRcv:boolean=false;
public time:any;

  constructor(private chat:ApiServiceService) {
   
    
   }
  ngOnInit() {
   this.chat.getMessage().subscribe((res:Message[])=>{this.chatList=res;console.log(this.chatList)})
   this.chat.getfererId().subscribe((res:Referid[])=>{this.referid=res;console.log("referid:"+this.referid)
    this.referid.forEach((id)=>this.referidArray.push(id.referid))
  })
    this.chat.getNotifications().subscribe((res:Notifications[])=>{
     this.notifications=res;
     console.log(this.notifications[0])
     
    });
    

    $('.toast').toast('show');
  }
  chatOpen(name:string,id){
    //alert("hii")
    this.isOpen=false;
    this.chatopen=true;
    this.username=name;
    this.isClick=false;
    this.chat.getMessageFromadmin(id).subscribe((res:AdminMessage[])=>{
      
      console.log("admin message:"+res);this.adminChat=res
    if(this.adminChat.length!=0){
      this.isSent=true;
    }
    //check for notification is being read or not....?
   for(var i=0;i<this.referidArray.length;i++){
     console.log('searching...'+i)
     if(this.referidArray[i]==id){
       console.log("find it!!")
       this.chat.messageStatus(id).subscribe(res=>console.log("updated")); 
    }
   }
  //console.log(this.notificationsArray.length);
 //this.adminChat.forEach((message)=>this.chatArray.push(message))
  })
    this.chat.getAllMessage(id).subscribe((res:GetMessages[])=>{
      this.reply=res;
      console.log(res);
      if(this.reply.length!=0){
        this.isRecieve=true;
      }
      });
     this.chatid=id
  }
  
  sendMessage(){
  console.log("send message")
  console.log(this.messageData);
    this.chatArray.push(this.messageData.toString());
     this.time=new Date().toTimeString().substring(0,9)
  
   this.isSent=true;
 
   console.log('test')
  $('textarea').val('');
  this.chat.sendMessage(this.messageData.toString(),this.username.toString(),this.chatid).
  subscribe((res)=>console.log('successfully sent'));
  if(this.chatArray,length!=0){
    this.isRcv=true;
  }
  }
  ngAfterViewInit(){
   
  }
  showpopUp(){
    alert("popup")
  }
  popover(){
    $('#popover1').popover({
     html:true,
     
    })
  }
  group(){
    alert("hiii")
  }
  public isClick:boolean=true;
}
