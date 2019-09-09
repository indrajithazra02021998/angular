import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  AbstractControl, Validators,FormControl } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {ApiServiceService} from '../api-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ResourceLoader } from '@angular/compiler';
import { Location, ɵngClassDirectiveDef__POST_R3__ } from '@angular/common';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
   payment:FormGroup;
   card: StripeElement;
   elements: Elements;

 
// optional parameters
elementsOptions: ElementsOptions = {
locale: 'es'
};
  constructor( private location:Location,
    private fb:FormBuilder,
    private service:ApiServiceService,
    private spinner:NgxSpinnerService,
    private stripeService: StripeService) { 
  
    this.crateForm();
  }

  ngOnInit() {
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
     // window.location.reload();
      this.spinner.show("mySpinner", {
        type: "line-scale-party",
        size: "large",
        bdColor: "rgba(100,149,237, .8)",
        color: "white"
      });
    },);
      }
    
     crateForm(){
       this.payment=this.fb.group({
       cardNumber:['',Validators.required],
       mm:['',Validators.required],
       cvv:['',Validators.required], 
       holder:['',Validators.required]
       })
   
 }

 makePayment(card,mm,cvv,holder){
  
    this.service.payment(card,mm,cvv,holder).subscribe((res)=>{console.log("payment success!!")
    this.payment.reset();
 })

}

}
