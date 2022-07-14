import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { LaunchAutomationComponent } from './launch-automation/launch-automation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    StockListComponent,
    LaunchAutomationComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MatInputModule,
    MatListModule,
    MatCommonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
