import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { Function } from '../fonctions/function.model';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-editfonction',
  templateUrl: './editfonction.component.html',
  styleUrls: ['./editfonction.component.scss'],
})
export class EditfonctionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http : HttpClient) { }
  result : string;
  result1 : string;
  stringed : any[][] = [[]];
  stringed1 : any[][] = [[]];

  function_name : string = "Function name";
  fun : Function;
  visib : boolean = false;
  error : boolean = false;

  ngOnInit(): void {
    console.log( this.route.snapshot.paramMap.get('id'));
    let baseApiUrl = "http://localhost:3000/get-function/" + this.route.snapshot.paramMap.get('id')
    this.http.get<Function>(baseApiUrl).subscribe(res => {
      this.fun = res;
      console.log(this.fun);
      if(this.fun.query_error == "undefined"){
        this.executeErrorQuery(this.fun.query);   
      }else{
        this.executeErrorQuery(this.fun.query_error);   
      }
      this.apply('x', this.fun.query) 
    })
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup(f : string) {
    this.displayStyle = "none";
    this.fun.name = f;
  }
  updateStatus(id : number, update : number){
    let baseApiUrl = "http://localhost:3000/update-fn-status/"+id+"/" + update
    this.http.get(baseApiUrl).subscribe(res => {
    });
  }
  executeErrorQuery(err_quey : string){
    let baseApiUrl = "http://localhost:3000/query/x"
    this.http.post<any>(baseApiUrl, {query : err_quey}).subscribe(res => {
      if((res == null) || (res.length == 0)){
        this.error = false;
        this.updateStatus(this.fun.id, 1);
        return;
      }else{
        this.error = true;
        this.updateStatus(this.fun.id, 0);
        //let obj = JSON.parse(res);
        this.result1 = res;
        Object.keys(res[0]).forEach(e => {
          this.stringed1[0].push(e);
        })
        this.stringed1.push([]);
        console.log(this.stringed1);
        let r = 1;
        res.forEach(k => {
          Object.values(k).forEach(t => {
            console.log(t);
            
            this.stringed1[r].push(t);
          });
          r++;
          this.stringed1.push([]);
        })
        this.stringed1.pop();
      }
    });
  }

  showExcel(){
    let element = document.getElementsByName('excel-table')[0]; 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'errors.xlsx');
  }
  apply(table_name : string, query : string){
    this.stringed = [[]];
    console.log(table_name);
    console.log(query);
    
    let baseApiUrl = "http://localhost:3000/query/"+table_name
    this.http.post<any>(baseApiUrl, {query : query}).subscribe(res => {
      console.log(res);
      if((res == null) || (res.length == 0)){
        this.visib = true;
        this.updateStatus(this.fun.id, 1);
        return;
      }
      this.updateStatus(this.fun.id, 0);
      this.visib = false;
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
  save(name : string, query : string, error : string){
    console.log(error);
    
    let baseApiUrl = "http://localhost:3000/mod-function/" + this.route.snapshot.paramMap.get('id');
    this.http.post<any>(baseApiUrl, {id: this.route.snapshot.paramMap.get('id'), query : query, status : 1, name : name, query_error : error}).subscribe(res => {
      console.log(res);
    })
  }
}
