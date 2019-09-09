import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  AbstractControl, Validators } from '@angular/forms';
import {ApiServiceService} from '../api-service.service';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import {State} from '../state';
import {City} from '../city';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  angForm: FormGroup;
   submitted=false;
    state_list:State[];
    city_list:City[];
    constructor(private fb:FormBuilder, private list:ApiServiceService,private route:Router) {
      this.createProfileForm();
     }
     createProfileForm(){
      this.angForm=this.fb.group({
        first_name:['',Validators.required],
        last_name:['',Validators.required],
        email:['',Validators.required],
        mobile:['',Validators.required],
        address:['',Validators.required],
        country:['',Validators.required],
        state:['',Validators.required],
        city:['',Validators.required]
      });
    }  
  ngOnInit() {
  }

  
}
