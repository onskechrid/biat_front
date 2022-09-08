import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  id_customer : string="";
  id_bct : string = "";
  comp : string = "";
  ref_crdt : string = "";
  selected : string = "";
  qer1 : string = "";
  qer2 : string = "";
  sellist : string[];
  number: any;

  name : string="";
  id : string="";
  lib : string = "";
  idbct: string = "";
  badge : string = "";
  value : string="";

  constructor(private http: HttpClient) { this.qer1= localStorage.getItem('qer1');
  this.qer2= localStorage.getItem('qer2'); }

  ngOnInit(): void {  
    let baseApiUrl = "http://localhost:3000/alldatsit"
    this.http.get<string[]>(baseApiUrl).subscribe(res => {
      let arr = [];
      for(let i = 0; i<=res.length-1; i++){
        let y = res[i].toString()
        console.log(y)
        let s = y.substring(0,4) + '-' + y.substring(4,6) + "-" + y.substring(6,8)
        
        arr.push(s)
      }
      this.sellist = arr
    })  
  }

  displayStyle = "none";
  
  changed(i : number, event : any){
    switch(i){
      case 1:
        this.id_customer = event.target.value;
        break;
      case 2: 
        this.id_bct = event.target.value;
        break;
      case 3:
        this.comp = event.target.value;
        break;
      case 4:
        this.ref_crdt = event.target.value;
        break;
      case 5:
        this.selected = event.target.value;
        break;
    }
  }
  subQuery1(text : string){    
      this.qer1 = text;
      localStorage.setItem('qer1', this.qer1)
      if(this.badge = "id_customer"){
        this.value = this.id_customer
      }else if( this.badge = "id_bct"){
        this.value= this.id_bct
      }else if( this.badge = "comp"){
        this.value= this.comp
      }else{
        this.value= this.ref_crdt
      }
      let baseApiUrl = "http://localhost:3000/query/"+this.badge+this.value+this.selected
      this.http.post<any>(baseApiUrl , {query : text}).subscribe(res => {
      console.log(res)
    });
  }
  subQuery2(text : string){
    this.qer2 = text;
    localStorage.setItem('qer2', this.qer2)
  }
  trash(){    
    this.id_bct = "";
    this.id_customer = "";
    this.ref_crdt = "";
    this.comp = "";
  }




/////////////////////////////////////////////////////// HOUNI KIF TENZEL AALA BOUTON TA3 ID_CUSTOMER
  idc(id_customer: string){
    this.badge = "id_customer";
    this.validate_id_id(id_customer);
    this.validate_id_name(id_customer);
    this.validate_id_idbct(id_customer);
    this.validate_id_lib(id_customer);

    console.log("finish");
  }
  
  validate_id_id(id_customer:string){ 
    console.log("id")
    this.id = id_customer;
  }
  validate_id_name(id_customer:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:3000/name1/"+id_customer
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_id_idbct(id_customer:string){ 
    console.log("idbct");
    console.log("idcustomer", id_customer)
    let baseApiUrl = "http://localhost:3000/idbct1/"+id_customer
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_id_lib(id_customer:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:3000/lib1/"+id_customer
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.lib = Object.values(res)[0];
    });
  }


  /////////////////////////////////////////////////////// HOUNI KIF TENZEL AALA BOUTON TA3 ID_BCT
  idBct(id_bct: string){
    this.badge = "id_bct";
    this.validate_idbct_id(id_bct);
    this.validate_idbct_name(id_bct);
    this.validate_idbct_idbct(id_bct);
    this.validate_idbct_lib(id_bct);

    console.log("finish");
  }
  
  validate_idbct_id(id_bct:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:3000/id2/"+id_bct
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_idbct_name(id_bct:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:3000/name2/"+id_bct
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_idbct_idbct(id_bct:string){ 
    console.log("idbct");
    this.idbct = id_bct;
  }
  validate_idbct_lib(id_bct:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:3000/lib2/"+id_bct
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.lib = Object.values(res)[0];
    });
  }

  /////////////////////////////////////////////////////// HOUNI KIF TENZEL AALA BOUTON TA3 COMP
  Comp(comp: string){
    this.badge = "comp";
    this.validate_comp_id(comp);
    this.validate_comp_name(comp);
    this.validate_comp_idbct(comp);
    this.validate_comp_lib(comp);

    console.log("finish");
  }
  
  validate_comp_id(comp:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:3000/id3/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_comp_name(comp:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:3000/name3/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_comp_idbct(comp:string){ 
    console.log("idbct");
    let baseApiUrl = "http://localhost:3000/idbct3/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_comp_lib(comp:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:3000/lib3/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.lib = Object.values(res)[0];
    });
  }

  /////////////////////////////////////////////////////// HOUNI KIF TENZEL AALA BOUTON TA3 REF_CRDT
  refCrdt(ref_crdt: string){
    this.badge = "ref_crdt";
    this.validate_refcrdt_id(ref_crdt);
    this.validate_refcrdt_name(ref_crdt);
    this.validate_refcrdt_idbct(ref_crdt);
    this.validate_refcrdt_lib(ref_crdt);

    console.log("finish");
  }
  
  validate_refcrdt_id(ref_crdt:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:3000/id4/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_refcrdt_name(ref_crdt:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:3000/name4/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_refcrdt_idbct(ref_crdt:string){ 
    console.log("idbct");
    let baseApiUrl = "http://localhost:3000/idbct4/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_refcrdt_lib(ref_crdt:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:3000/lib4/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.lib = Object.values(res)[0];
    });
  }


}
