import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  tables : string[];
  number : number;
  result : string;
  stringed : any[][] = [[]];
  constructor(private http : HttpClient) { }
  ngOnInit(): void {
    let baseApiUrl = "http://localhost:3000/get-tables"
    this.http.get<string[]>(baseApiUrl).subscribe(res => {this.tables = res;})
  }

  nbrwrongfunct(){
    let baseApiUrl = "http://localhost:3000/nbrwrongFunction"
    this.http.get<number>(baseApiUrl).subscribe(res => {this.number = res})
    return this.number;
  };
  apply(table_name : string, query : string){
    this.stringed = [[]];
    console.log(table_name);
    console.log(query);
    
    let baseApiUrl = "http://localhost:3000/query/"+table_name
    this.http.post<any>(baseApiUrl, {query : query}).subscribe(res => {
      console.log(res);
      //let obj = JSON.parse(res);
      this.result = res;
      Object.keys(res[0]).forEach(e => {
        this.stringed[0].push(e);
      })
      this.stringed.push([]);
      console.log(this.stringed);
      let r = 1;
      res.forEach(k => {
        Object.values(k).forEach(t => {
          console.log(t);
          
          this.stringed[r].push(t);
        });
        r++;
        this.stringed.push([]);
      })
      this.stringed.pop();
    })
  }
}
