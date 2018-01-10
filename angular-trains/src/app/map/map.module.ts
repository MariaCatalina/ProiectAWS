import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { TrainsGoogleMap } from './map.component';

@NgModule({
  declarations: [ 
    TrainsGoogleMap
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  exports: [TrainsGoogleMap]
})

export class TrainGoogleMapModule { }