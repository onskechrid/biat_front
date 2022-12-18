import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as pbi from 'powerbi-client';
import { environment } from 'src/environments/environment';
import { Function } from './function.model';

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.scss']
})


export class FonctionsComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient) { }

  switch : boolean = false;
  functions : Function[] = [];
  
  ngOnInit(): void {
    this.switch = false;
    let baseApiUrl = "http://localhost:8080/api/v1/functions/showAll"
    this.http.get<Function[]>(baseApiUrl).subscribe(res => {
      this.functions = res;
      //this.checkfns();
      //window.location.reload();
    })
  }
  ngAfterContentInit() : void{
    this.checkfns();
  }
  report: pbi.Embed;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

  checkfns(){
    this.functions.forEach((e) =>{
      let baseApiUrl = "http://localhost:8080/api/v1/functions/queryinput/x"
      this.http.post<any>(baseApiUrl, {query : e.query}).subscribe(res => {
        console.log(res);
        if(res.length == 0){
          this.updateStatus(e.id, 1);
          e.status = 1
        }else{
          this.updateStatus(e.id, 0);
          e.status = 0;
        }
      })
    })
  }
  checkValue(event : any){
    if(event.target.checked == true){
      let baseApiUrl = "http://localhost:8080/api/v1/functions/showAll"
      this.http.get<Function[]>(baseApiUrl).subscribe(res => {
        let k : Function[] = [];
        res.forEach((e) => {
          if(e.status == 0){          
            k.push(e)
          }
        })
        console.log(k);
        this.functions = k;
        this.checkfns();
        //window.location.reload();
      })
    }else{
      let baseApiUrl = "http://localhost:8080/api/v1/functions/showAll"
      this.http.get<Function[]>(baseApiUrl).subscribe(res => {
        this.functions = res;
        this.checkfns();
        //window.location.reload();
      })
    }
  }
  updateStatus(id : number, update : number){
    let baseApiUrl = "http://localhost:8080/api/v1/functions/update_fn_status/"+id+"/" + update
    this.http.get(baseApiUrl).subscribe(res => {
    });
  }
  search(text : string){
    console.log(text);
    
    let baseApiUrl = "http://localhost:8080/api/v1/functions/showAll"
    this.http.get<Function[]>(baseApiUrl).subscribe(res => {
      let k : Function[] = [];
      res.forEach((e) => {
        if(e.name == text){          
          k.push(e)
        }
      })
      console.log(k);
      if(k.length != 0){
        this.functions = k;
      }else{
        this.functions = res;
      }
      this.checkfns();
      //window.location.reload();
    })
  }
  del(id : number){
    console.log(id);
    
    let baseApiUrl = "http://localhost:8080/api/v1/functions/delete" + id
    this.http.delete<any>(baseApiUrl).subscribe(res => {  
    })
    window.location.reload();
  }
  showReport(Token) {
    // Embed URL    
    let embedUrl = environment.powerBI.reportBaseURL;
    let embedReportId = environment.powerBI.reportID;
  let settings: pbi.IEmbedSettings = {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
    };
  let config: pbi.IEmbedConfiguration = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: Token.token,
      embedUrl: embedUrl,
      id: embedReportId,
      filters: [],
      settings: settings
    };
  let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    this.report = powerbi.embed(reportContainer, config);
    this.report.off("loaded");
  this.report.on("loaded", () => {
      console.log("Loaded");
      this.setTokenExpirationListener(Token.expiration, 2);
    });
  this.report.on("error", () => {
      console.log("Error");
    });
  }
  setTokenExpirationListener(expiration: any, arg1: number) {
    throw new Error('Method not implemented.');
  }

}
