import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  tables : {name: string, data: any[][] }[] = [];
  number : number;
  result : string;
  stringed : any[][] = [[]];
  main_container : boolean = false;
  qres : any[] = [];
  
  constructor(private http : HttpClient) { }
  ngOnInit(): void {
    this.main_container = false;
    this.qres = [];
    let baseApiUrl = "http://localhost:3000/get-tables"
    this.http.get<string[]>(baseApiUrl).subscribe(res => {
      res.forEach((e) => {
       this.getDataForEachTable(e)
      })
      this.nbrwrongfunct()
    })
  }

  getDataForEachTable(e) : any{
    console.log(e)
    this.main_container = false;
    let baseApiUrl = "http://localhost:3000/query/x"
    let u = 'select * from "' + e + '";'
    let yy =e;
    console.log(u)
    this.http.post<any>(baseApiUrl, {query : u}).subscribe(res => {
      //let obj = JSON.parse(res);
      if(res.length == 0){
        let o : any = {
          name : yy,
          data : [[]]
        }
        this.tables.push(o);
      }else{
      console.log("wewewee")
      let stringed = [[]]
      Object.keys(res[0]).forEach(e => {
        stringed[0].push(e);
      })
      stringed.push([]);
      console.log(stringed);
      let r = 1;
      res.forEach(k => {
        Object.values(k).forEach(t => {
          stringed[r].push(t);
        });
        r++;
        stringed.push([]);
      })
      stringed.pop();
      //this.qres.push(stringed)
      let o : any = {
        name : yy,
        data : stringed
      }
      this.tables.push(o);
    }
    })
  }
  changed(event : any){
    if(event.target.value.length == 0){
      this.main_container = false;
    }
  }
  nbrwrongfunct(){
    let baseApiUrl = "http://localhost:3000/nbrwrongFunction"
    this.http.get<number>(baseApiUrl).subscribe(res => {
      
       this.number = res[0].n})
  };
  apply(table_name : string, query : string){
    this.main_container = true;
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