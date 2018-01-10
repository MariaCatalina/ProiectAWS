import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderFooterModule } from './headerfooter/headerfooter.module';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HeaderFooterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB-pEbB2oHty7mWof9-c1uBHMFTgQV2T7U'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
