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
  sellist : string[];
  number: any;

  name : string="";
  id : string="";
  idd : string="";
  lib : string = "";
  idbct: string = "";
  badge : string = "";
  value : string="";
  datsit: number;
  d : string="";
  iddd : string="";

  result : string;
  stringed : any[][] = [[]];
  visib : boolean = false;
  enable : boolean = true;
  query : string = "";
  q1 : string ="";
  q2 : string ="";
  query2 : string = "";
  router: any;
  total : string="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  
    let baseApiUrl = "http://localhost:8080/api/v1/filter/alldatsit"
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
        this.d = this.selected.substring(0,4)+this.selected.substring(5,7)+this.selected.substring(8,10);
        console.log(this.d)
        this.datsit = parseInt(this.d)

        this.q1 = `select aa.* , "DESC" from
    ( select a."CUST" , "COMP" ,"Comp_CTOS", "REF_CONT"  ,"LIB_LONG" , a."CATG" , "TYPE_ENG" , "CODE_TYP_ENCR" , a."STATUT", "MONT_ENCR_REDR_TND" from
    ( select a.* ,c."CUST" , "LIB_LONG"  , "CATG", "TYPE_ENG", "REF_CRDT", "COMP"
     FROM (select * from "E_ENCOURS" ee  where "DAT_SIT" =`+this.datsit+`  and "DERSIT" =1 and "STATUT" ='A' /*and substring("REF_CONT",1,2) not in ('CX') */) A ,
    "R_TYPE_ENCOUR" B  ,
    (select * from "E_CONTRAT" ec where "DERSIT" =1) C
    where A."CODE_TYP_ENCR"= B."ID" and A."REF_CONT" = C."REF_CONT"
    ) a , ( select * from "E_ACCOUNT" ea where "DERSIT" =1 ) b
    where a."COMP" = B."ID"
    ) aa ,  "R_CODE_ENG" b where "CUST" ='`+this.id+`' and aa."TYPE_ENG"=B."ID"
    order by "TYPE_ENG", "REF_CONT" , "CODE_TYP_ENCR" ;`
        console.log(this.datsit);
        break; 
    }

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  apply(table_name : string, query : string){
    this.stringed = [[]];
    console.log(table_name);
    console.log(query);
    console.log(this.q1)
    let baseApiUrl = "http://localhost:8080/api/v1/functions/queryinput/"+table_name
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
    this.somme(this.id,this.datsit);
  }

  somme(id : string , datsit: number){ 
    console.log(id);
    console.log(datsit);
    let baseApiUrl = "http://localhost:8080/api/v1/filter/total/"+id+"/"+datsit
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.total = Object.values(res)[0];
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  trash(){    
    this.id_bct = "";
    this.id_customer = "";
    this.ref_crdt = "";
    this.comp = "";
  }

/////////////////////////////////////////////////////// HOUNI KIF TENZEL AALA BOUTON TA3 ID_CUSTOMER
  idC(id_customer: string){
    this.badge = "id_customer";
    this.validate_id_id(id_customer);
    this.validate_id_name(id_customer);
    this.validate_id_idbct(id_customer);
    this.validate_id_lib(id_customer);
    this.q1 = `select aa.* , "DESC" from
    ( select a."CUST" , "COMP" ,"Comp_CTOS", "REF_CONT"  ,"LIB_LONG" , a."CATG" , "TYPE_ENG" , "CODE_TYP_ENCR" , a."STATUT", "MONT_ENCR_REDR_TND" from
    ( select a.* ,c."CUST" , "LIB_LONG"  , "CATG", "TYPE_ENG", "REF_CRDT", "COMP"
     FROM (select * from "E_ENCOURS" ee  where "DAT_SIT" =`+this.datsit+`  and "DERSIT" =1 and "STATUT" ='A' /*and substring("REF_CONT",1,2) not in ('CX') */) A ,
    "R_TYPE_ENCOUR" B  ,
    (select * from "E_CONTRAT" ec where "DERSIT" =1) C
    where A."CODE_TYP_ENCR"= B."ID" and A."REF_CONT" = C."REF_CONT"
    ) a , ( select * from "E_ACCOUNT" ea where "DERSIT" =1 ) b
    where a."COMP" = B."ID"
    ) aa ,  "R_CODE_ENG" b where "CUST" ='`+this.id+`' and aa."TYPE_ENG"=B."ID"
    order by "TYPE_ENG", "REF_CONT" , "CODE_TYP_ENCR" ;`
    console.log("finish");
  }
  
  validate_id_id(id_customer:string){ 
    console.log("id")
    this.id = id_customer;
  }
  validate_id_name(id_customer:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/nameidcustomer/"+id_customer
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_id_idbct(id_customer:string){ 
    console.log("idbct");
    console.log("idcustomer", id_customer)
    let baseApiUrl = "http://localhost:8080/api/v1/filter/idbctidcustomer/"+id_customer
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_id_lib(id_customer:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:8080/api/v1/filter/liblidcustomer/"+id_customer
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
    this.q1 = `select aa.* , "DESC" from
    ( select a."CUST" , "COMP" ,"Comp_CTOS", "REF_CONT"  ,"LIB_LONG" , a."CATG" , "TYPE_ENG" , "CODE_TYP_ENCR" , a."STATUT", "MONT_ENCR_REDR_TND" from
    ( select a.* ,c."CUST" , "LIB_LONG"  , "CATG", "TYPE_ENG", "REF_CRDT", "COMP"
     FROM (select * from "E_ENCOURS" ee  where "DAT_SIT" =`+this.datsit+`  and "DERSIT" =1 and "STATUT" ='A' /*and substring("REF_CONT",1,2) not in ('CX') */) A ,
    "R_TYPE_ENCOUR" B  ,
    (select * from "E_CONTRAT" ec where "DERSIT" =1) C
    where A."CODE_TYP_ENCR"= B."ID" and A."REF_CONT" = C."REF_CONT"
    ) a , ( select * from "E_ACCOUNT" ea where "DERSIT" =1 ) b
    where a."COMP" = B."ID"
    ) aa ,  "R_CODE_ENG" b where "CUST" ='`+this.id+`' and aa."TYPE_ENG"=B."ID"
    order by "TYPE_ENG", "REF_CONT" , "CODE_TYP_ENCR" ;`
    console.log("finish");
  }
  
  validate_idbct_id(id_bct:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:8080/api/v1/filter/ididbct/"+id_bct
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_idbct_name(id_bct:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/nameidbct/"+id_bct
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
    let baseApiUrl = "http://localhost:8080/api/v1/filter/liblidbct/"+id_bct
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
    this.q1 = `select aa.* , "DESC" from
    ( select a."CUST" , "COMP" ,"Comp_CTOS", "REF_CONT"  ,"LIB_LONG" , a."CATG" , "TYPE_ENG" , "CODE_TYP_ENCR" , a."STATUT", "MONT_ENCR_REDR_TND" from
    ( select a.* ,c."CUST" , "LIB_LONG"  , "CATG", "TYPE_ENG", "REF_CRDT", "COMP"
     FROM (select * from "E_ENCOURS" ee  where "DAT_SIT" =`+this.datsit+`  and "DERSIT" =1 and "STATUT" ='A' /*and substring("REF_CONT",1,2) not in ('CX') */) A ,
    "R_TYPE_ENCOUR" B  ,
    (select * from "E_CONTRAT" ec where "DERSIT" =1) C
    where A."CODE_TYP_ENCR"= B."ID" and A."REF_CONT" = C."REF_CONT"
    ) a , ( select * from "E_ACCOUNT" ea where "DERSIT" =1 ) b
    where a."COMP" = B."ID"
    ) aa ,  "R_CODE_ENG" b where "CUST" ='`+this.id+`' and aa."TYPE_ENG"=B."ID"
    order by "TYPE_ENG", "REF_CONT" , "CODE_TYP_ENCR" ;`
    console.log("finish");
  }
  
  validate_comp_id(comp:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:8080/api/v1/filter/idcomp/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_comp_name(comp:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/namecomp/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_comp_idbct(comp:string){ 
    console.log("idbct");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/idbctcomp/"+comp
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_comp_lib(comp:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:8080/api/v1/filter/liblcomp/"+comp
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
    this.q1 = `select aa.* , "DESC" from
    ( select a."CUST" , "COMP" ,"Comp_CTOS", "REF_CONT"  ,"LIB_LONG" , a."CATG" , "TYPE_ENG" , "CODE_TYP_ENCR" , a."STATUT", "MONT_ENCR_REDR_TND" from
    ( select a.* ,c."CUST" , "LIB_LONG"  , "CATG", "TYPE_ENG", "REF_CRDT", "COMP"
     FROM (select * from "E_ENCOURS" ee  where "DAT_SIT" =`+this.datsit+`  and "DERSIT" =1 and "STATUT" ='A' /*and substring("REF_CONT",1,2) not in ('CX') */) A ,
    "R_TYPE_ENCOUR" B  ,
    (select * from "E_CONTRAT" ec where "DERSIT" =1) C
    where A."CODE_TYP_ENCR"= B."ID" and A."REF_CONT" = C."REF_CONT"
    ) a , ( select * from "E_ACCOUNT" ea where "DERSIT" =1 ) b
    where a."COMP" = B."ID"
    ) aa ,  "R_CODE_ENG" b where "CUST" ='`+this.id+`' and aa."TYPE_ENG"=B."ID"
    order by "TYPE_ENG", "REF_CONT" , "CODE_TYP_ENCR" ;`
    console.log("finish");
  }
  
  validate_refcrdt_id(ref_crdt:string){ 
    console.log("id")
    let baseApiUrl = "http://localhost:8080/api/v1/filter/idrefcrdt/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.id = Object.values(res)[0];
    });
  }
  validate_refcrdt_name(ref_crdt:string){ 
    console.log("name");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/nameidrefcrdt/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.name = Object.values(res)[0];
    });
  }
  validate_refcrdt_idbct(ref_crdt:string){ 
    console.log("idbct");
    let baseApiUrl = "http://localhost:8080/api/v1/filter/idbctidrefcrdt/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
        console.log(Object.values(res)[0])
        this.idbct = Object.values(res)[0];
    });
  }
  validate_refcrdt_lib(ref_crdt:string){ 
    console.log("lib");
    console.log(this.lib)
    let baseApiUrl = "http://localhost:8080/api/v1/filter/liblidrefcrdt/"+ref_crdt
      this.http.get<string>(baseApiUrl).subscribe(res => {
      console.log(Object.values(res)[0])
      this.lib = Object.values(res)[0];
    });
  }


}
