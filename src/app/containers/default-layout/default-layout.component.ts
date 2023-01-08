import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { Url } from './url.model';
import { HttpClient } from '@angular/common/http';
import { navItems } from './_nav';
import { Router } from '@angular/router';
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


  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  public navItems = navItems;
  //public myCheckbox: boolean;
  public perfectScrollbarConfig = {
    suppressScrollX: true
  };
  


  constructor(private router : Router, private http : HttpClient, private formBuilder: FormBuilder) {
  }
  displayStyle = "none";
  displayStyle1 = "none";


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

  openPopup() {
    this.displayStyle = "block";
    let baseApiUrl = "http://localhost:8080/api/v1/menu/showAll"
    this.http.get<Menu[]>(baseApiUrl).subscribe(res => {
      this.menus = res;
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