import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { Function } from '../fonctions/function.model';


@Component({
  selector: 'app-editfonction',
  templateUrl: './editfonction.component.html',
  styleUrls: ['./editfonction.component.scss'],
})
export class EditfonctionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http : HttpClient) { }
  result : string;
  stringed : any[][] = [[]];
  function_name : string = "Function name";
  fun : Function;

  ngOnInit(): void {
    console.log( this.route.snapshot.paramMap.get('id'));
    let baseApiUrl = "http://localhost:3000/get-function/" + this.route.snapshot.paramMap.get('id')
    this.http.get<Function>(baseApiUrl).subscribe(res => {this.fun = res})
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup(f : string) {
    this.displayStyle = "none";
    this.fun.name = f;
  }
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
  save(name : string, query : string){
    let baseApiUrl = "http://localhost:3000/mod-function/" + this.route.snapshot.paramMap.get('id');
    this.http.post<any>(baseApiUrl, {id: this.route.snapshot.paramMap.get('id'), query : query, status : 1, name : name}).subscribe(res => {
      console.log(res);
    })
  }
}
