import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addfonction',
  templateUrl: './addfonction.component.html',
  styleUrls: ['./addfonction.component.scss']
})
export class AddfonctionComponent implements OnInit {

  constructor(private router : ActivatedRoute, private http : HttpClient) { }
  result : string;
  stringed : any[][] = [[]];
  function_name : string = "Nom de la fonction";
  visib : boolean = false;
  enable : boolean = true
  qs : string = ""
  ngOnInit(): void {
    this.enable = true;
    if(this.router.snapshot.paramMap.get('query')){
      this.qs = this.router.snapshot.paramMap.get('query')
    }
  }

  apply(queryinput : string){
    this.stringed = [[]];
    console.log(queryinput);
    
    let baseApiUrl = "http://localhost:8080/api/v1/functions/query/"+ queryinput
    this.http.get<any>(baseApiUrl).subscribe(res => {
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
    let baseApiUrl = "http://localhost:8080/api/v1/functions/add";
    if(querr != ""){
      this.http.post<any>(baseApiUrl, {queryexcel: querr, query : query, status : 1, name : name}).subscribe(res => {
        console.log(res);
      })
    }else{
      this.http.post<any>(baseApiUrl, {query : query, status : 1, name : name}).subscribe(res => {
        console.log(res);
      })
    }
  }
}
