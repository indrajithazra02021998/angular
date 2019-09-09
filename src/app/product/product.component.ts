import { Component, OnInit ,ViewContainerRef,ElementRef,ViewChild} from '@angular/core';
import { FormGroup,  FormBuilder,  AbstractControl, Validators,FormControl } from '@angular/forms';
import {ApiServiceService} from '../api-service.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import{Editproduct} from '../editproduct';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  myDate = new Date();
  isDisable=false;
  isEnable=true;
  id:string;
editList:Editproduct[];
  angForm: FormGroup;
 
  submitted=false;
  selectImg:File=null;
  i:number=0;
  //uploader:FileUploader=null;
  imgurl:string="/assets/img/dhoni.gif";
  private datePipe: DatePipe;
fileToUpload:File=null;
formdata=new FormData();
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
createProfileForm(){
    this.angForm=this.fb.group({
     // ProductID:['',Validators.required],
      ProductName:['',Validators.required],
      Price: ['', Validators.required],
      ProductImage:['', Validators.required],
      DiscountPrice:['',Validators.required],
     // active:['',Validators.required],
      start_date:['',Validators.required],
      end_date:['',Validators.required],
      
    });
  }
    onSubmit(ProductName,Price,ProductImage,DiscountPrice,start_date,end_date){
      this.submitted=true;
      console.log("filenam size:"+this.fileToUpload.size);
      if (this.angForm.invalid) {
        return;
        }
        
  if(!this.isDisable){
    confirm('Are you sure to insert?');
    console.log(this.fileToUpload);
     this.list.createProduct(ProductName,Price,this.fileToUpload.name,DiscountPrice,start_date,end_date)
    .subscribe((res)=>console.log(res))        
     
    
    
   
     //this.list.createUserProfile(this.angForm.value.first_name,this.angForm.value.last_name,
      //this.angForm.value.email,this.angForm.value.address,this.angForm.value.mobile,
      //this.angForm.value.country,this.angForm.value.state,this.angForm.value.city).subscribe((res)=>console.log('insert successfully'));
       this.angForm.reset();
       this.imgurl="/assets/img/dhoni.gif";
       console.log("insert data");
       this.snackbar.open("insert Successfully",'Dismiss',{
        duration: 2000,
      });
       
      this.route.navigateByUrl('/product_list');
      //window.location.reload(); 
    }else{
      if(confirm("Are You sure to update")){
        this.editProduct(ProductName,Price,this.fileToUpload.name,DiscountPrice,start_date,end_date);
        this.route.navigateByUrl('/product_list');
      }

    }
  }
      
  editProduct(ProductName,Price,ProductImage,DiscountPrice,start_date,end_date){
       this.list.editProductItem(ProductName,Price,ProductImage,DiscountPrice,start_date,end_date,this.id).subscribe((res)=>console.log("edit success"));
      
       
      }
      Imghandler(file:FileList){
        //this.fileToUpload=<File>event.target.files[0];
      this.fileToUpload=file.item(0);
       var reader=new FileReader();
       reader.onload=(event:any)=>{
        this.imgurl=event.target.result;
        //this.angForm.get('ProductImage').setValue(this.fileToUpload);
       // this.selectImg=event.target.files;
        // console.log("event :"+event);
        // this.formdata.append('file', this.fileToUpload, this.fileToUpload.name);
         //console.log( this.selectImg+"slelect image");
        
       }
      reader.readAsDataURL(this.fileToUpload);}
     // reader.readAsDataURL(this.fileToUpload);
     // console.log(this.fileToUpload.name);}
      upload(){
           this.formdata.append("image",this.fileToUpload,this.fileToUpload.name);
          // this.formdata.append("image",this.angForm.get('ProductImage').value);
          console.log("ProductImage"+this.fileToUpload,this.fileToUpload.name);
          this.list.uploadImg(this.fileToUpload).subscribe((res)=>console.log(res));
          alert("upload successfully");
          console.log(this.formdata)
          
      }
      getEditDetails(id){
          this.list.editProduct(id).subscribe((res:Editproduct[])=>{
            this.editList=res,console.log(this.editList[0].image)
            var DateObj = new Date(this.editList[0].discount_statdate);
            var edate=new Date(this.editList[0].discount_enddate);
            if(DateObj.getUTCMonth()<=9 && DateObj.getUTCDate()<=9){
              var date=DateObj.getUTCFullYear()+"-0"+DateObj.getUTCMonth()+"-0"+DateObj.getUTCDate();
            }else{
              if(DateObj.getUTCMonth()<=9 && DateObj.getUTCDate()>9){
                var date=DateObj.getUTCFullYear()+"-0"+(DateObj.getUTCMonth()+1)+"-"+DateObj.getUTCDate();
              }else{
                var date=DateObj.getUTCFullYear()+"-"+(DateObj.getUTCMonth()+1)+"-"+DateObj.getUTCDate();
              }
            
            }

            if(edate.getUTCMonth()<=9 && edate.getUTCDate()<=9){
              var e_date=edate.getUTCFullYear()+"-0"+edate.getUTCMonth()+"-0"+edate.getUTCDate();
            }else{
              if(edate.getUTCMonth()<=9 && edate.getUTCDate()>9){
                var e_date=edate.getUTCFullYear()+"-0"+edate.getUTCMonth()+"-"+edate.getUTCDate();
              }else{
                var e_date=edate.getUTCFullYear()+"-"+edate.getUTCMonth()+"-"+edate.getUTCDate();
              }
             
            }
            this.imgurl=`http://localhost:4000/pic/${this.editList[0].image}`;
           console.log(this.imgurl);
            //this.editList[0].discount_statdate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
             console.log(date);
            console.log( this.editList[0].discount_statdate);
            this.angForm.patchValue({
              ProductName:this.editList[0].name,
              Price:this.editList[0].price,
              DiscountPrice:this.editList[0].discount_price,
              start_date:date,
              end_date:e_date,
              ProductImage:this.imgurl,
             
            })
          
          });
          
         
      }
     
     
      }
      
