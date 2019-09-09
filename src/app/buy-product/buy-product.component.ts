import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import {ApiServiceService} from '../api-service.service';
import{Picture} from '../picture';
import {ActivatedRoute} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{Pic} from '../pic';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { fromStringWithSourceMap } from 'source-list-map';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NetworkStatusAngularModule } from 'network-status-angular';
import {StripePaymentComponent} from '../stripe-payment/stripe-payment.component'
declare var $: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  @Input() result:string="";
  @Input() parentData:string="";
  @Output() clicked=new EventEmitter<number>();
  count:number=0;
  TotalAmount:number=0;
  isTotal:boolean=false;
  image:Picture[];
   image1:Pic[];
  id:string;
  realPrice:string;
iscount:boolean=false;
  discount:string;
  Isdiscount:boolean=false;
  price2:string;
  constructor(private list:ApiServiceService ,private route:ActivatedRoute,private router:Router,
    private spinner:NgxSpinnerService) {
      this.spinner.show("mySpinner", {
        type: "line-scale-party",
        size: "large",
        bdColor: "rgba(100,149,237, .8)",
        color: "white"
      });
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);

     }
   isDiscount:boolean=true;
  ngOnInit() {
     console.log(navigator.onLine)
    this.route.paramMap.subscribe(params=>{
      const editId=params.get('id');
      
        //console.log("id"+editId);
       // this.getEditDetails(editId);
         this.id=editId;
      // alert(this.editList.first_name);
      
    });
    if(this.id){
      this.list.DontDisplay(this.id).subscribe((res:Picture[])=>{
        this.image=res;
        console.log("dont display"+this.image[1].price);
        for(var i=0;i<this.image.length;i++){
          // var date=new Date(this.image[i].discount_statdate);
           //console.log(new Date().getFullYear());
           //console.log(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay());  
           
           var date =new Date(this.image[i].discount_statdate);
           var edate =new Date(this.image[i].discount_enddate);
            var today=new Date();
           
            //2019-08-03 2019-08-10 // 2019-08-02
             if((today.getFullYear()>=date.getFullYear() && today.getFullYear()<=edate.getFullYear())){
               if(today.getMonth()>=date.getMonth() && today.getMonth()<=edate.getMonth()){
                 if(today.getDay()>=date.getDay() && today.getDay()<=edate.getDay()){
                   this.image[i].isDiscount=true;
                    var p=parseInt(this.image[i].price);
                    var p1=parseInt(this.image[i].discount_price);
                   console.log(p-p1);
                   this.image[i].discount_price=String(p-p1);
                     var offer=(p1/p)*100;
                     var float=String(offer);
                       var finaloffer=parseFloat(float).toFixed(2);
                     this.image[i].offer=String(finaloffer+"%"+" "+"Off");
                   //this.image[i].discount_price=this.image[i].price-this.image[i].discount_price;
                   //console.log(this.image[i].isDiscount);
                 }else{
                 this.image[i].isDiscount=false;
                 }
               }
             }
         }
      });

  }else{
  
    this.list.getImage().subscribe((res:Picture[])=>{this.image=res;this.image1=res;
      for(var i=0;i<this.image.length;i++){
        // console.log(this.image[i].name+" "+this.image[i].discount_enddate);
         var date =new Date(this.image[i].discount_statdate);
         var edate =new Date(this.image[i].discount_enddate);
          var today=new Date();
         console.log( today.getUTCDate());
           //console.log(today.getUTCDate());
          //2019-08-03 2019-08-10 // 2019-08-02
           console.log(date.getUTCDate()+1);
           console.log("year:"+today.getUTCFullYear()+"month:"+(today.getUTCMonth()+1)+"day:"+(today.getUTCDate()));
           console.log("year:"+date.getUTCFullYear()+"month:"+(date.getUTCMonth()+1)+"day:"+(date.getUTCDate()+1));
           console.log("year:"+edate.getUTCFullYear()+"month:"+(edate.getUTCMonth()+1)+"day:"+(edate.getUTCDate()+1));
           if((today.getUTCFullYear()>=date.getUTCFullYear() && today.getUTCFullYear()<=edate.getUTCFullYear())){
                console.log(this.image[i].name +" "+"enter 1st loop");  
             if((today.getUTCMonth()+1)>=(date.getUTCMonth()+1)&& (today.getUTCMonth()+1)<=(edate.getUTCMonth()+1)){
               console.log(this.image[i].name+" "+"enter 2nd loop"); 
               if((today.getUTCMonth()+1)>(date.getUTCMonth()+1) ){
               if(today.getUTCDate()<=(edate.getUTCDate()+1 ) && ((today.getUTCDate()>=(edate.getUTCDate()+1))
                || (today.getUTCDate()<=(edate.getUTCDate()+1)))){
                console.log(this.image[i].name+" "+"enter 3rd loop"); 
                 this.image[i].isDiscount=true;
                  var p=parseInt(this.image[i].price);
                  var p1=parseInt(this.image[i].discount_price);
                // console.log(p-p1);
                 this.image[i].discount_price=String(p-p1);
                   var offer=(p1/p)*100;
                   var float=String(offer);
                   var finaloffer=parseFloat(float).toFixed(2);
                   this.image[i].offer=String(finaloffer+"%"+" "+"Off");
                  // console.log(this.image[i].name+" "+"available"+date.getDate()+"today"+today.getDate())
                 //this.image[i].discount_price=this.image[i].price-this.image[i].discount_price;
                 //console.log(this.image[i].isDiscount);
               }else{
                  
                 this.image[i].isDiscount=false;
                // console.log(this.image[i].name+" "+" no offer");
                 //console.log(this.image[i].isDiscount);
               }
             } }
             else{
               //console.log(this.image[i].discount_enddate+"no available"+this.image[i].name)
               this.image[i].isDiscount=false;
             }
           }
          }
    
    });
  }
  }
  cart(){

    confirm("Are you ready to buy this product?");
  }
  getimg(id,price,disp,isDiscount:boolean){
    this.Isdiscount=isDiscount;
    console.log(id+"price:"+price+"isdiscount:"+isDiscount+"disp:"+disp);
  this.list.getimgRefrecnce(id).subscribe((res:Pic[])=>{
      console.log(res);
      this.image1=res;
      if(isDiscount){
        this.isTotal=true;
        var x =parseInt(this.image1[0].price);
        var y=parseInt(this.image1[0].discount_price);
        var r=(x-y);
        var float=String(r);
       var total=parseFloat(float).toFixed(2);
      // this.image1[0].discount_price=Total;
       this.discount=total;
       console.log(this.discount);
       console.log("total"+this.image1[0].price);
      }
      if(isDiscount==undefined || isDiscount==false){
        this.isTotal=false;
       var p= parseInt(this.image1[0].price)
       var p1=p*this.count;
       var float=String(p1);
       var total=parseFloat(float).toFixed(2);
        this.realPrice=total;
         console.log(this.realPrice);
      }
    });
   
  }
  countItem(id){
     this.count++;
     this.iscount=true;
      console.log("countItem id:"+this.realPrice);
       var p=parseInt(this.realPrice)*this.count;
         this.price2=  parseFloat(String(p)).toFixed(2);
       
       console.log(this.price2+"new price")
     //var x=parseInt()
    //this.realPrice=String(x)
    //console.log(x);
  }
  countLess(){
    this.iscount=false;
    if(this.count>0){
      this.count--;
       
    }else{
      this.count=0;
    }
  }
  buyNow(){
    var cost=parseInt(this.image1[0].price)*this.count;
    var cost2=parseInt(this.discount)*this.count;
    console.log(cost+"real price"+"real money "+this.image1[0].price);
    console.log(cost2+"discount price");
    if(this.Isdiscount){
      if(confirm("total amount is (Discount):"+cost2) && cost2>0){
        //this.clicked.emit(cost2);
        this.list.addRference(cost2);
        this.list.sendImage(this.image1[0].image).subscribe((res)=>console.log(res))
        this.router.navigate(["/payment"]);
      //this.list.addRference(cost2);
      
   }
    }else{

      if(this.Isdiscount==undefined || !this.Isdiscount){
        console.log("hiii");
        if(confirm("total amount is:"+cost) ){
             this.list.addRference(cost)
             this.list.sendImage(this.image1[0].image).subscribe((res)=>console.log(res))
            this.router.navigate(["/payment"])
            // this.list.addRference(cost);
        }
      }
    }
  }
}
