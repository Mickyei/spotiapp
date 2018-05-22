/**
 * Created by Micky on 29.4.2018.
 */
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Headers, URLSearchParams} from "@angular/http";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {headersToString} from "selenium-webdriver/http";


@Injectable()
export class SpotifyService {
  token: string;
  CLIENT_ID = "43f28354ec674df0b4e225fae487d8b1";
  CLIENT_SECRET = "042d0fa542484ddfa22c082247a4fa1e";
  TOKEN;
  REDIRECT_URI = "http://178.62.105.7:4200/callback"
  constructor(private http: HttpClient) { }

  fetch(trackName, searchType) {
    let huutist = {"Content-type": "application/json",
                "Authorization" : "Bearer " + this.TOKEN};
    let params = new HttpParams().set("q", trackName).set("type", searchType);
    return this.http.get('https://api.spotify.com/v1/search/', {headers: huutist, params: params});
  }

  authorize() {
    const encodeHeaders = new HttpHeaders();

    encodeHeaders.set("Content-type","application/x-www-form-urlencoded");
    encodeHeaders.set("Authorization","Basic NDNmMjgzNTRlYzY3NGRmMGI0ZTIyNWZhZTQ4N2Q4YjE6MDQyZDBmYTU0MjQ4NGRkZmEyMmMwODIyNDdhNGZhMWU=");

    const body = "grant_type=client_credentials";
    const headers = {'Content-Type':'application/x-www-form-urlencoded',"Authorization": "Basic NDNmMjgzNTRlYzY3NGRmMGI0ZTIyNWZhZTQ4N2Q4YjE6MDQyZDBmYTU0MjQ4NGRkZmEyMmMwODIyNDdhNGZhMWU="
     }
    this.http.post("https://accounts.spotify.com/api/token",body,{headers: headers}).subscribe( data => {
      this.TOKEN = data.access_token;
    })
  }

  implicit() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=token`;
  }

  parseURLHash () {
    let search = location.hash.substring(1);
    let urlHash = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
        function(key, value) { return key===""?value:decodeURIComponent(value) }):{}

    this.TOKEN = urlHash.access_token;
  }



}
