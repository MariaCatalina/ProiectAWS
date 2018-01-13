import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { TrainsGoogleMap } from './map.component';
import {SearchFilterModule} from "../search/search.module";
import {StationsService} from "./stations.service";

@NgModule({
  declarations: [
    TrainsGoogleMap
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SearchFilterModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyB-pEbB2oHty7mWof9-c1uBHMFTgQV2T7U'
    })
  ],
  providers: [StationsService,GoogleMapsAPIWrapper],
  exports: [TrainsGoogleMap]
})

export class TrainGoogleMapModule { }
