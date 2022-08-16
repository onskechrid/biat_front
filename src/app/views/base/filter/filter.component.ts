import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  id_customer : string = "";
  id_bct : string = "";
  comp : string = "";
  ref_crdt : string = "";
  qer1 : string = "";
  qer2 : string = "";

  constructor() { this.qer1= localStorage.getItem('qer1');
  this.qer2= localStorage.getItem('qer2'); }

  ngOnInit(): void {    
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
    }
  }
  subQuery1(text : string){    
      this.qer1 = text;
      localStorage.setItem('qer1', this.qer1)
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
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup(field_n : number, text : string) {
    this.displayStyle = "none";
  }

}
