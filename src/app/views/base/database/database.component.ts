import { DomSanitizer } from '@angular/platform-browser';
import * as Excel from '@grapecity/spread-excelio';
import * as GC from '@grapecity/spread-sheets';
import * as FileSaver from 'file-saver';
import { Component, OnInit } from '@angular/core';  
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';

class Content{
  content : string;
  constructor(cc : string){
    this.content = cc;
  }
}
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent {

  items = [1, 2, 3, 4];
  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh'
  };
  private spread;
  private excelIO;
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) 
  {
    this.spread = new GC.Spread.Sheets.Workbook();
    this.excelIO = new Excel.IO();
  }
  
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  getAccordionBodyText(value: string){
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }


  title = 'read-excel-in-angular8';  
  storeData: any;  
  csvData: any;  
  jsonData: any;  
  textData: any;  
  htmlData: any;  
  fileUploaded: File;  
  worksheet: any;  
  event : Event;
  dbname : string;

  getChange(event : any){
    this.dbname = event.target.value;
  }
  uploadedFile(event) {  
    console.log("hello");
    this.fileUploaded = event.target.files[0];  
    console.log(this.fileUploaded);
    this.readExcel();  
  }  

  upload(){
    console.log(this.fileUploaded);

    let baseApiUrl = "http://localhost:3000/upload"
    
    const formData = new FormData(); 

    console.log(this.fileUploaded.type);
    
    formData.append("file", this.fileUploaded, this.fileUploaded.name);
    formData.append("dbname", this.dbname);

    this.http.post(baseApiUrl, formData).subscribe({})

  }

  readExcel() {  
    let readFile = new FileReader();  
    readFile.onload = (e) => {  
      this.storeData = readFile.result;  
      var data = new Uint8Array(this.storeData);  
      var arr = new Array();  
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
      var bstr = arr.join("");  
      var workbook = XLSX.read(bstr, { type: "binary" });  
      var first_sheet_name = workbook.SheetNames[0];  
      this.worksheet = workbook.Sheets[first_sheet_name];  
    }  
    readFile.readAsArrayBuffer(this.fileUploaded);  
  }  
  
  readAsCSV() {  
    let baseApiUrl = "http://localhost:3000/file-content"
    window.open(baseApiUrl, "_blank");
  }  

}
