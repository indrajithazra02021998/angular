import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../api-service.service';
import { ApiClent} from '../api-clent';
import {ViewClass} from '../view-class';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers:[CookieService]
})
export class ListUserComponent implements OnInit {
  _id:number;
  list:ApiClent[];
  view:ViewClass[];
  num=16;
  cookieValue="UNKOWN"
  //socket: SocketIOClient.Socket;

 constructor(private apiService:ApiServiceService,private router:Router,private cookieService:CookieService) { 
  //this.socket = io.connect();
 // console.log("socket....running")
 }
  ngOnInit() {
    this.cookieService.set("cookieName","dreamztech Solutions",365*24*3600);
    this.cookieValue=this.cookieService.get('cookieName');
    console.log("cookie:"+" "+this.cookieValue)
    //location.reload();
    this.apiService.getAllUserList().subscribe((res:ApiClent[])=>{this.list=res,console.log(this.list) });
   // window.location.reload();
  }
  viewUserInfo(id){
    this._id=id;
  this.apiService.viewUserDetails(id).subscribe((res:ViewClass[])=>this.view=res);
  //this.router.navigate(['view',{id:id}]);
   //console.log(this.getId());
  
  }
  editUserProfile(id){
    console.log(id);
     
    this.router.navigate([`/edit`,id]);
   //this.apiService.update(id).subscribe((res)=>console.log("update successfull"))
  }
  deleteUser(id){
    if(confirm("Are you sure to delete ?")){
    this.apiService.deleteUserProfile(id).subscribe((res:ApiClent[])=>this.list=res);
    //this.router.navigate(['/delete',{id:id}]);
  }}
  crateProfile(){
  }
  getId():number{
   return this.num;
  }
 

}
