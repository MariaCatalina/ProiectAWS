import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderFooterModule } from './headerfooter/headerfooter.module';
import {GoogleMapsModule} from 'google-maps-angular2';
import { AgmCoreModule } from '@agm/core';
import { TrainGoogleMapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HeaderFooterModule,
    TrainGoogleMapModule,
    GoogleMapsModule.forRoot({
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-pEbB2oHty7mWof9-c1uBHMFTgQV2T7U'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
