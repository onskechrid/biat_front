import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { Url } from './url.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { navItems } from './_nav';
import {FormBuilder} from '@angular/forms';
import {IconSubset} from './../../icons/icon-subset';



@Component({
  selector: 'app-login',
  templateUrl: './default-layout.component.html',
})

export class DefaultLayoutComponent implements OnInit{
  menus : Menu[] = [];
  urls : Url[] =[];
  menu: Menu;
  list : Menu[]=[];

  
  checked :false;

  keys = Object.keys;
  icons = IconSubset;
  icon_name : string;
  config_op : Menu [] = []

  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  //public myCheckbox: boolean;
  public perfectScrollbarConfig = {
    suppressScrollX: true
  };

  public navItems= navItems;
  
  updateSidebar(){
    for(let y =0; y <=this.config_op.length-1; y++){
      console.log(this.config_op[y].hidden);
      if(this.config_op[y].hidden == true){
        this.navItems.push({
          name: this.config_op[y].name,
          url: '/base/dashboard',
          iconComponent: { name: 'cil-border-all' }
        })
      } 
    }
  }

  constructor(private router : Router, private http : HttpClient, private formBuilder: FormBuilder) {
  }
  displayStyle = "none";
  displayStyle1 = "none";

  

  search_conf(id : number){
    for(let y =0; y <=this.config_op.length-1; y++){
      if(this.config_op[y].id== id) return this.config_op[y]
    }
    return null
  }
  onSubmit1() {
    this.customStylesValidated = true;
    console.log('Submit... 1');
  }

  onReset1() {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }
  
  ngOnInit(): void {
    
  }

  cochi (id : number, checked : boolean){
    for(let y =0; y <=this.config_op.length-1; y++){
      if(this.config_op[y].id== id) this.config_op[y].hidden = checked
    }
    console.log(this.config_op);
    this.updateSidebar() 
  }
  openPopup() {
    this.displayStyle = "block";
    let baseApiUrl = "http://localhost:8080/api/v1/menu/showAll"
    this.http.get<Menu[]>(baseApiUrl).subscribe(res => {
      this.menus = res;
      this.config_op = res
      console.log(this.menus);
      
    });
    let baseApiUrl1 = "http://localhost:8080/api/v1/url/showAll"
    this.http.get<Url[]>(baseApiUrl1).subscribe(res => {
      this.urls= res;
    })
  }
  openPopupicons() {
    this.displayStyle1 = "block";
    this.icon_name = this.menu.iconcomponent;
    let baseApiUrl = "http://localhost:8080/api/v1/menu/showAll"
    this.http.get<Menu[]>(baseApiUrl).subscribe(res => {
      this.menus = res;
    });
  }
  Enregistrer() {
    this.displayStyle = "none";
  } 
  Enregistrericons(icon : string) {
    this.displayStyle1 = "none";
    this.icon_name = icon;
  } 
}