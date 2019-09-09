import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { HttpHeaders } from '@angular/common/http';
import {Router, Route} from '@angular/router';
import { async } from '@angular/core/testing';
import * as io from 'socket.io-client';
//import { Socket } from 'ngx-socket-io';
import  'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
 // socket: SocketIOClient.Socket;
  public clientSocket:SocketIOClient.Socket;
  private socketio:any;

  constructor(private http:HttpClient,private nav:NgxNavigationWithDataComponent,
    private navigate:Router) { 
      
    this.clientSocket=io("http://localhost:4000")
     
    // console.log("conneted.."+this.clientSocket);
   
  }
  ngOnInit(): void {
 console.log("creating..")
    
  }
  url="http://localhost:4000";
  urladd="http://localhost:4000/add";
  urladdproduct="http://localhost:4000";
  baseUrl="http://localhost:4000/view";
  deleteUrl="http://localhost:4000/delete";
  getstate="http://localhost:4000/getState";
  getcountry="http://localhost:4000/getcountry";


  //private socket=io("http://localhost:4000");
  
  getAllUserList(){
   
   //console.log("socket"+this.socket)

   
   return this.http.get(this.url);
   
  }
  createUserProfile(first_name,last_name,email,address,mobile,country,state,city,isadmin){
    var data={
      first_name:first_name,
      last_name:last_name,
      email:email,
      address:address,
      mobile:mobile,
      country:country,
      state:state,
      city:city,
      isadmin:isadmin
    }
   return this.http.post(`${this.urladd}`,data,{headers:new HttpHeaders({
     'Content-Type':  'application/json',
   })});

  //return  this.http.get(`${this.urladd}`,{params:{first_name:first_name,last_name:last_name,email:email, address:address,mobile:mobile,country:country,state:state,city:city}});
  }
  viewUserDetails(id){
    var data={id:id};
    return this.http.post(`${this.baseUrl}`,data,{headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })});
    //return this.http.get(`${this.baseUrl}/${id}`);
  }
  deleteUserProfile(id){
    this.navigate.navigateByUrl('/');
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }
  // to get all state...
  getAllState(countryId){
    return this.http.get(`${this.url}/state/${countryId}`);
  }
  getAllCity(stateID){
    return this.http.get(`${this.url}/city/${stateID}`);
  }
  update(first_name,last_name,email,address,mobile,country,state,city,isadmin,id){
    var data={
      first_name:first_name,
      last_name:last_name,
      email:email,
      address:address,
      mobile:mobile,
      country:country,
      state:state,
      city:city,
      isadmin:isadmin,
      id:id
    }
    return this.http.post(`${this.url}/update`,data,{headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })});
   // return this.http.get(`${this.url}/update`,{params:{first_name:first_name,last_name:last_name,email:email, address:address,mobile:mobile,country:country,state:state,city:city,id:id}});
  }
  editUser(id){
    var data={id:id};
    return this.http.post(`${this.url}/editview`,data,{headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })});
  }
  getState(id:string){
    return this.http.get(`${this.getstate}/${id}`);
  }
  getCountry(id:string){
    return this.http.get(`${this.getcountry}/${id}`);
  }
checkMail(email:string){
  return this.http.get(`${this.url}/mail`,{params:{email:email}});
}
getProductList(){
 return this.http.get(`${this.url}/product_list`);

}
createProduct(ProductName,Price,ProductImage,DiscountPrice,start_date,end_date){
  var data={
   // ProductID:ProductID,
    ProductName:ProductName,
    Price:Price,
    ProductImage:ProductImage,
    DiscountPrice:DiscountPrice,
   // active:active,
    start_date:start_date,
    end_date:end_date
  }
 return this.http.post(`${this.urladdproduct}/addProduct`,data,{headers:new HttpHeaders({
   'Content-Type':  'application/json',
 })});
}
  uploadImg(file:File){
     const fb=new FormData();
     fb.append("image",file,file.name);
     console.log("file"+file.name);
    return this.http.post(`${this.url}/imageUpload`,fb);
  }
  // get all record.. from product table;
  getAllProduct(){
   return this.http.get(`${this.url}/product_list`);
  }
 deleteItem(id){
   return this.http.delete(`${this.url}/deleteItem/${id}`);
 }
 editProductItem(ProductName,Price,ProductImage,DiscountPrice,start_date,end_date,id){
  var data={
    //ProductID:ProductID,
    ProductName:ProductName,
    Price:Price,
    ProductImage:ProductImage,
    DiscountPrice:DiscountPrice,
    start_date:start_date,
    end_date:end_date,
    id:id};
  return this.http.post(`${this.url}/editProductItem`,data,{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })});
}
editProduct(id){
  var data={id:id};
    return this.http.post(`${this.url}/editProduct`,data,{headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })});
}
getImage(){
  return this.http.get(`${this.url}/getpic`);
}
DontDisplay(id){
  var data={id:id};
   return this.http.post(`${this.url}/display`,data,{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
}
getimgRefrecnce(id){
  var data={id:id};
  
   return this.http.post(`${this.url}/getimg`,data,{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
}
payment(card,date,cvv,name){
  return this.http.post(`${this.url}/payment`,{card:card,date:date,cvv:cvv,name:name},{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
}
public num:number;
addRference(id){
this.num=id;
console.log("addrefernce:"+this.num);
}
getRference(){
  
  return this.num
}
sendImage(img:string){
  var data={img:img};
   return this.http.post(`${this.url}/saveImage`,data,{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
}
gateSaveImg(){
  return this.http.get(`${this.url}/gateSaveImg`);
}
getMessage(){
  return this.http.get(`${this.url}/getmessage`);
}
sendMessage(message:string,customer:string,id:any){
  var data={
    message:message,
    admin:'Dreamztech',
    customer:customer,id:id
  }
  return this.http.post(`${this.url}/sendMessage`,data,{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
}
getAllMessage(id){
  return this.http.post(`${this.url}/getMessageFromClient`,{id:id},{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })});
}
getMessageFromadmin(id){
 return this.http.post(`${this.url}/getMessageFromAdmin`,{id:id},{headers:new HttpHeaders({
  'Content-Type':  'application/json',
})})
}
getNotifications(){
  return this.http.get(`${this.url}/notifications`);
}
messageStatus(id){
  return  this.http.post(`${this.url}/messageStatus`,{id:id},{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})

}
 fetchNotificationsFromMessageStatus(id){
   return this.http.post(`${this.url}/getNotifications`,{id:id},{headers:new HttpHeaders({
    'Content-Type':  'application/json',
  })})
 }
 getfererId(){
   return this.http.get(`${this.url}/getfererId`);
 }

}
