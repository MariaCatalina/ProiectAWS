import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderFooterModule } from './headerfooter/headerfooter.module';
import {GoogleMapsModule} from 'google-maps-angular2';
import { AgmCoreModule } from '@agm/core';
import { TrainGoogleMapModule } from './map/map.module';
import {SearchFilter} from "./search/search.component";
import {SearchFilterModule} from "./search/search.module";
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "./message.service";


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
    HttpClientModule

    // GoogleMapsModule.forRoot({
    //   url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-pEbB2oHty7mWof9-c1uBHMFTgQV2T7U&callback=initMap'
    // })
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB-pEbB2oHty7mWof9-c1uBHMFTgQV2T7U'
    // })
  ],
  providers: [HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
