
import { Component, OnInit, ViewChild, Input,ElementRef ,Output, AfterViewInit} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute,Router} from '@angular/router';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import {ReactiveFormsModule, FormGroup,  FormBuilder,  AbstractControl, Validators,FormControl,FormsModule } 
from '@angular/forms';
import {ApiServiceService} from '../api-service.service';
import { async } from 'q';

declare var $: any;
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css'],
  providers:[]
})


export class StripePaymentComponent implements OnInit,AfterViewInit {
  public ispayment:boolean=false;
  public isEnable :boolean=true;
  public i:number=0;
  @ViewChild(StripeCardComponent,{static: false}) card: StripeCardComponent;
  @Input() price;
  @Input() product;
  @Input() description;
  public parentData:any;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#111',
        color: '#111',
        fontSize:"16px",
        '::placeholder': {
          color: '#111'
        }
      }
  }
}
public  num:any;
//other optional options
elementsOptions: ElementsOptions = {
  locale: 'en'
};
paymentForm:FormGroup
  constructor( private stripeService: StripeService, private httpclient: HttpClient,
    private route:ActivatedRoute,private router:Router,private api:ApiServiceService) {
      this.parentData=this.api.getRference();
    this. paymentForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)})
   }
   buy(formdata: FormData){
    
    this.stripeService.createToken(this.card.getCard(), {name} )
    .subscribe(result => {
      
      if(result.token){
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        let obj = {
          token: result.token.id,
          email: formdata["email"],
          user: formdata["name"],
          amount: this.parentData,
          product: this.product,
          description: this.description
          
        }

        //make a call to the server
        this.httpclient.post("http://localhost:4000/charge",
        JSON.stringify(obj),
        {headers: headers} ).subscribe( data => {
          console.log("---- Transaction Data -----");
          //message from the API
          console.log(data);
          this.ispayment=true;
          this.isEnable=false;
        });
        console.log("token id"+result.token.id);
      }else if(result.error){
        console.log(result.error.message);
      }

    });

     this.paymentForm.reset();
     formdata.delete;
  }
   
  ngOnInit() {
    
    console.log( "Get reference"+this.api.getRference())
    
     // this.parentData=this.num;
    /*let param = this.router.parseUrl(this.router.url);
console.log(param.queryParams.id)*/
   /* this.route.paramMap.subscribe(params=>{
      if(params.get('pay')){
        this.parentData=parseInt(params.get('pay'))
        console.log(typeof(this.parentData))

      }
    })*/
  }
ngAfterViewInit(){
 // $('.modal-backdrop').removeClass("show");
 $('.modal-backdrop').hide();
  console.log( "Get After reference"+this.api.getRference())
}
}
