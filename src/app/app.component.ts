import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyService} from "./spotify.service";
import {BackendService} from "./backend.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchType: string;
  results: Object[];
  recentSearches: Object[];
  searchTypeList: string[] = ["track", "album", "artist"];
  tableHeaders = [["Song name", "Album", "Artist"], ["Album name", "Artist"], ["Artist name"]];
  selectedHeaders = this.tableHeaders[0];

  constructor(private http: HttpClient, private spotiSearch: SpotifyService, private backService: BackendService) {

  }

  ngOnInit() {

    this.searchType = "track";
    this.spotiSearch.authorize();
    this.getSearches();
  }

  search(searchInput, searchType) {

    if(searchInput.value.trim() === "") {
      alert("Search box can't be empty!");
    } else {
      this.searchType = searchType.value;
      this.spotiSearch.fetch(searchInput.value, this.searchType).subscribe(data => {
        console.log(data);
        if (this.searchType === "track") {
          this.results = data.tracks.items
          this.selectedHeaders = this.tableHeaders[0];

        } else if (this.searchType === "album") {
          this.results = data.albums.items
          this.selectedHeaders = this.tableHeaders[1];
        } else if (this.searchType === "artist") {
          this.selectedHeaders = this.tableHeaders[2];
          this.results = data.artists.items
        }

      });
    }
  }

  saveSearch(searchInput, selectedType) {
    if(searchInput.value.trim() === "") {
      alert("Search box can't be empty!");
    } else {
      this.backService.post(searchInput.value, selectedType.value);
      this.recentSearches.push({object : {
        search: searchInput.value,
        searchType: selectedType.value
      }})
    }

  }

  getSearches() {
    this.backService.fetch().subscribe(data => {
      console.log(data);
      this.recentSearches = data;
    });
  }
}
