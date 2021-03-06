import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SpotifyService} from "./spotify.service";
import {FormsModule} from "@angular/forms";
import {BackendService} from "./backend.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [SpotifyService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
