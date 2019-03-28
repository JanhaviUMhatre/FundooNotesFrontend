import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packagecard',
  templateUrl: './packagecard.component.html',
  styleUrls: ['./packagecard.component.scss']
})
export class PackagecardComponent implements OnInit {
  details: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJson()
  }
  getJson(){
    this.http.get('http://34.213.106.173/api/user/service').subscribe(
      (Response)=>{console.log("success",Response);
      this.details=Response['data']['data']
      },
      (error)=>{console.log("error",error);
      }
    )
  }
}
