import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ViewUserInfoComponent } from './view-user-info/view-user-info.component';
import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { EditComponent } from './edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { BuyProductComponent } from './buy-product/buy-product.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxStripeModule } from 'ngx-stripe';
import { NgxSpinnerModule } from "ngx-spinner";
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import {MatCardModule} from '@angular/material/card';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CookieService } from 'ngx-cookie-service';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 
const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    CreateProfileComponent,
    ViewUserInfoComponent,
    EditComponent,
    ProductListComponent,
    ProductComponent,
    FileSelectDirective,
    BuyProductComponent,
    PaymentGatewayComponent,
    StripePaymentComponent,
    ChatAppComponent,
  ],
  imports: [NgxStripeModule.forRoot('pk_test_TUow7cqxwe1Cx0w5dPqlqxM000EhQUAJ2Z'),
    BrowserModule,MatSnackBarModule,NgxPaginationModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule, BrowserAnimationsModule, NgxSpinnerModule ,
    MatCardModule,GoogleChartsModule.forRoot(),
     SocketIoModule.forRoot(config)
  ],
  providers: [NgxNavigationWithDataComponent,StripePaymentComponent,CookieService],
  bootstrap: [AppComponent,]
})
export class AppModule { 
  page: number = 1;
}
