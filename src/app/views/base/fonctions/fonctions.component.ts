import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pbi from 'powerbi-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.scss']
})


export class FonctionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  report: pbi.Embed;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

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
