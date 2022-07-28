import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  tables : string[];
  constructor(private http : HttpClient) { }
  ngOnInit(): void {
    let baseApiUrl = "http://localhost:3000/get-tables"
    this.http.get<string[]>(baseApiUrl).subscribe(res => {this.tables = res;})
  }
}
