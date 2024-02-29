import { NgModule } from '@angular/core';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//icons
import { NzIconModule } from 'ng-zorro-antd/icon';

// components
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


//components
import { NavComponent } from './components/layout/nav/nav.component';
import { CustomersComponent } from './components/tables/customers/customers.component';
import { CustomerRegisterComponent } from './components/modals/customer-register-modal/customer-register-modal.component';

//routes
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';

//services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    CustomersComponent,
    CustomerRegisterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //Icons
    NzIconModule,

    //Components
    NzRadioModule,
    NzEmptyModule,
    NzModalModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    NzNotificationModule,
    NzFormModule
  ],
  providers: [
    AuthService,
    UserService,
    CustomerService,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
