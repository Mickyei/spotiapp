import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyService} from "./spotify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchType: string;
  results: Object[];
  searchTypeList: string[] = ["track", "album", "artist"];
  tableHeaders = [["Song name", "Album", "Artist"], ["Album name", "Artist"], ["Artist name"]];
  selectedHeaders = this.tableHeaders[0];

  constructor(private http: HttpClient, private spotiSearch: SpotifyService) {

  }

  ngOnInit() {

    this.searchType = "track";
    this.spotiSearch.authorize();
  }

  search(searchInput, testaus) {
    this.searchType = testaus.value;
    this.spotiSearch.fetch(searchInput.value, this.searchType).subscribe(data => {
      console.log(data);
      if(this.searchType === "track") {
        this.results = data.tracks.items
        this.selectedHeaders = this.tableHeaders[0];

      } else if(this.searchType === "album") {
        this.results = data.albums.items
        this.selectedHeaders = this.tableHeaders[1];
      }else if(this.searchType === "artist") {
        this.selectedHeaders = this.tableHeaders[2];
        this.results = data.artists.items
      }

    });

  }
}
