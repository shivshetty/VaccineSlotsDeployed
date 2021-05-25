import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { IsValidPipe } from './is-valid.pipe'

@NgModule({
  declarations: [
    AppComponent,
    IsValidPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule   ,ReactiveFormsModule 
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
