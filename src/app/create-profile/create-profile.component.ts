import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  AbstractControl, Validators,FormControl } from '@angular/forms';
import {ApiServiceService} from '../api-service.service';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import {State} from '../state';
import {City} from '../city';
import {ActivatedRoute} from '@angular/router';
import {ViewClass } from  '../view-class';
import { ApiClent} from '../api-clent';
import {Editclass} from '../editclass';
import {MatSnackBar} from '@angular/material';
import{GetState} from '../get-state';
import {GetCountry} from '../get-country';

 


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
  providers:[State,City]
})
export class CreateProfileComponent implements OnInit {
   angForm: FormGroup;
  
   submitted=false;
    state_list:State[];
    city_list:City[];
    editList:Editclass[];
    isDisable=false;
    isEnable=true;
    id:string;
   state_name:string;
    country_name:string;
  s:GetState[];
  c:GetCountry[];
  emailExistant=false;
 cityAray=[
  ]
    first_name:string="indrajit";
  constructor(private fb:FormBuilder,
    private list:ApiServiceService,
     private route:Router,
private actvivateRoute:ActivatedRoute,private snackbar:MatSnackBar) {
    this.createProfileForm();
   }

  ngOnInit() {
   
    this.actvivateRoute.paramMap.subscribe(params=>{
      const editId=params.get('id');
      if(editId){
        console.log("id"+editId);
        this.isEnable=false;
        this.isDisable=true;
        this.getEditDetails(editId);
         this.id=editId;
      // alert(this.editList.first_name);
      }
    })
   
  }
  

  get f() { 
    first_name:stringify;
    return this.angForm.controls; }
  createProfileForm(){
     this.angForm=this.fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email: ['', Validators.required],
      mobile:['',Validators.required],
      address:['',Validators.required],
      country:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      genderControl:['',Validators.required] ,
       
    });
  }
  getEmail(email:string){
      this.list.checkMail(email).subscribe(res=>{console.log(res)
      if(res!=0){
       //alert("email already exist")
       this.emailExistant=true;
        
      }else{this.emailExistant=false}
      });
      return null;
    }
  getState(country:number){
     
    this.list.getAllState(country).subscribe((res:State[])=>{this.state_list=res,
           // res.forEach((name)=>this.cityAray.push(name));
           console.log(this.state_list)});
          // this.state_list?this.cityAray.pop():this.cityAray;
    //console.log("statelist"+this.state_list);
  }
  getCity(state:number){
    this.list.getAllCity(state).subscribe((res:City[])=>{
      this.city_list=res;
      //res.forEach((name)=>this.cityAray.push(name));
     // alert(this.city_list),console.log(this.city_list)
    });

    //console.log(this.city_list);   
    }
  onSubmit(first_name,last_name,email,address,mobile,country,state,city,isadmin){
    this.submitted=true;
    if (this.angForm.invalid) {
      return;
  }
  if(!this.isDisable){
  confirm('Are you sure to insert?');
  this.list.getCountry(country).subscribe((res:GetCountry[])=>{
    this.c=res,this.country_name=this.c[0].name,console.log("country:"+this.country_name)
    this.list.getState(state).subscribe((res:GetState[])=>{this.s=res,this.state_name=this.s[0].name,console.log("state:"+this.state_name)
    this.addUserInfo(first_name,last_name,email,address,mobile,this.country_name,this.state_name,city,isadmin);
  });
    
  });
   //this.list.createUserProfile(this.angForm.value.first_name,this.angForm.value.last_name,
    //this.angForm.value.email,this.angForm.value.address,this.angForm.value.mobile,
    //this.angForm.value.country,this.angForm.value.state,this.angForm.value.city).subscribe((res)=>console.log('insert successfully'));
     this.angForm.reset();
     console.log("insert data");
     this.snackbar.open("insert Successfully",'Dismiss',{
      duration: 2000,
    });
     
    this.route.navigateByUrl('/');
    //window.location.reload(); 
  }else{
     if(confirm("Are You sure to update")){
      this.list.getCountry(country).subscribe((res:GetCountry[])=>{
        this.c=res,this.country_name=this.c[0].name,console.log("country:"+this.country_name)
        this.list.getState(state).subscribe((res:GetState[])=>{this.s=res,this.state_name=this.s[0].name,console.log("state:"+this.state_name)
        this.editUserInfo(first_name,last_name,email,address,mobile,this.country_name,this.state_name,city,isadmin);
      }); 
      });
    console.log("update is being process..");
    this.snackbar.open("update Successfully",'Dismiss',{
      duration: 2000,
    });
    this.route.navigateByUrl('/');
  }}
  }
  getEditDetails(id){
    this.list.editUser(id).subscribe((res:Editclass[])=>{this.editList=res,console.log(this.editList[0].country);
      this.angForm.patchValue({
        first_name:this.editList[0].first_name,
        last_name:this.editList[0].last_name,
        email:this.editList[0].email,
        address:this.editList[0].address,
        mobile:this.editList[0].mobile,
        country:this.editList[0].country,
        state:this.editList[0].state,
        city:this.editList[0].city
      
      })
    });
   
   }
   editUserInfo(first_name,last_name,email,address,mobile,country,state,city ,isadmin){
   this.list.update(first_name,last_name,email,address,mobile,country,state,city,isadmin,this.id).subscribe((res)=>console.log('update successfully'));

   }
   addUserInfo(first_name,last_name,email,address,mobile,country,state,city,isadmin){
     console.log(this.angForm.get('genderControl').value);
    this.list.createUserProfile(first_name,last_name,email,address,mobile,country,state,city,isadmin).subscribe((res)=>console.log(res));
  
}
   
}
