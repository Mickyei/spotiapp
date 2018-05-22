import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
/**
 * Created by Micky on 22.5.2018.
 */

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) { }

  fetch(){
    return this.http.get('http://46.101.93.1:3000/searches');
  }

  post(searchValue, searchType) {
    const obj = {"search": searchValue, "searchType": searchType};
    this.http.post('http://46.101.93.1:3000/searches', obj).subscribe(data => {
      console.log(data);
    });
  }

}
