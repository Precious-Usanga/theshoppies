import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NominationComponent } from './nomination/nomination.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutModule } from './layout/layout.module';
 import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ApiKeyInterceptor } from './core/interceptor/api-key.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NominationComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    IvyCarouselModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
