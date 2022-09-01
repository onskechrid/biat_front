import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addfonction',
  templateUrl: './addfonction.component.html',
  styleUrls: ['./addfonction.component.scss']
})
export class AddfonctionComponent implements OnInit {

  constructor(private http : HttpClient) { }
  result : string;
  stringed : any[][] = [[]];
  function_name : string = "Nom de la fonction";
  visib : boolean = false;
  enabled : boolean = false;

  ngOnInit(): void {
    this.enabled = false;
  }

  /*displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup(f : string) {
    this.displayStyle = "none";
    this.function_name = f;
  }*/
  apply(table_name : string, query : string){
    this.stringed = [[]];
    console.log(table_name);
    console.log(query);
    
    let baseApiUrl = "http://localhost:3000/query/"+table_name
    this.http.post<any>(baseApiUrl, {query : query}).subscribe(res => {
      if(res == null){
        this.visib = true;
        this.enabled = false;
      }else{
        this.visib = false;
      }
      if(res.length == 0){
        this.enabled = true;
      }else{
        this.enabled = false;
      }
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
  save(name : string, query : string, querr : string){
    let baseApiUrl = "http://localhost:3000/add-function";
    if(querr != ""){
      this.http.post<any>(baseApiUrl, {query_error: querr, query : query, status : 1, name : name}).subscribe(res => {
        console.log(res);
      })
    }else{
      this.http.post<any>(baseApiUrl, {query : query, status : 1, name : name}).subscribe(res => {
        console.log(res);
      })
    }
  }
}
