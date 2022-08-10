import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pbi from 'powerbi-client';
import { environment } from 'src/environments/environment';
import { Function } from './function.model';

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.scss']
})


export class FonctionsComponent implements OnInit {

  constructor(private http : HttpClient) { }

  functions : Function[] = [];
  
  ngOnInit(): void {
    let baseApiUrl = "http://localhost:3000/show-function"
    this.http.get<Function[]>(baseApiUrl).subscribe(res => {this.functions = res;})
    this.checkfns()
  }
  report: pbi.Embed;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

  checkfns(){
    this.functions.forEach((e) =>{
      let baseApiUrl = "http://localhost:3000/query/x"
      let valid_q_e = 0;
      this.http.post<any>(baseApiUrl, {query : e.query_error}).subscribe(res => {
        console.log(res);
        valid_q_e = 0;
        if(res.length == 0){
          valid_q_e = 1;
        }else{
          valid_q_e = 0;
        }
        
        this.http.post<any>(baseApiUrl, {query : e.query}).subscribe(res => {
          console.log(res);
          if((valid_q_e == 1) && (res.length == 0)){
            e.status = 1;
            this.updateStatus(e.id, 1)
          }else{
            e.status = 0;
            this.updateStatus(e.id, 0)
          }
        })
      })
    })
  }
  updateStatus(id : number, update : number){
    let baseApiUrl = "http://localhost:3000/update-fn-status/"+id+"/" + update
    this.http.get(baseApiUrl).subscribe(res => {
    });
  }
  del(id : number){
    console.log(id);
    
    let baseApiUrl = "http://localhost:3000/delete-function/" + id
    this.http.delete<any>(baseApiUrl).subscribe(res => {  
    })
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
