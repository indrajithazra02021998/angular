import { Component, OnInit } from '@angular/core';
import{ProductList} from '../product-list';
import {ApiServiceService} from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   product_list:ProductList[];
   count:number=0;
  constructor(private product:ApiServiceService,private route:Router) { 
          
  }

  ngOnInit() {
   
   var  DateObj=new Date();
    var date=DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
     console.log(date);
    this.product.getAllProduct().subscribe((res:ProductList[])=>{console.log(res),this.product_list=res})
   
  }
  editUserProduct(id){
    console.log(id);
      
    this.route.navigate([`/editProduct`,id]);
  }
  active(id){
    
  }
  deleteProduct(id){
    if(confirm("Are you sure to delete ?")){
     this.product.deleteItem(id).subscribe((res:ProductList[])=>this.product_list=res);
  }
  
}
change(id){
    this.count++;
     alert("id"+id);
     if(this.count%2==1){
      alert(this.count);
      this.product.DontDisplay(id).subscribe((res)=>console.log(res))
      this.route.navigate([`/buy`,id]);
      
     }

}
}
