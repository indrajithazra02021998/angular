import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateProfileComponent} from '../app/create-profile/create-profile.component';
import {ListUserComponent} from '../app/list-user/list-user.component';
import {ViewUserInfoComponent } from '../app/view-user-info';
import {ProductListComponent} from '../app/product-list/product-list.component';
import{ProductComponent} from '../app/product/product.component';
import{BuyProductComponent} from '../app/buy-product/buy-product.component'
import{PaymentGatewayComponent} from '../app/payment-gateway/payment-gateway.component';
import {StripePaymentComponent} from '../app/stripe-payment/stripe-payment.component'
import{ChatAppComponent} from '../app/chat-app/chat-app.component'
const routes: Routes = [
{path:'create', component:CreateProfileComponent},
{path:'', component:ListUserComponent},{
  path:'view',component:ViewUserInfoComponent
},
 {
   path:'delete/:id', redirectTo :'',pathMatch:"full" 
  },{
    path:'edit/:id',component:CreateProfileComponent ,pathMatch:"full" 
  },{
    path:'product_list',component:ProductListComponent
  },{

    path:'product',component:ProductComponent
  },
  {
    path:'editProduct/:id', component:ProductComponent,pathMatch:'full'
  },
{
  path:'buy',component:BuyProductComponent
},{
  path:'buy/:id', component:BuyProductComponent
},{

  path:'payment', component:StripePaymentComponent
},
{
  path:'payment/:pay', component:StripePaymentComponent
},
{
  path:'chat', component:ChatAppComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

