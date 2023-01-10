import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent, INavData } from '@coreui/angular';
import {User} from "../../../models/User"


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  private _router: any;
  user !: User

  constructor(private http : HttpClient, private route : Router, private classToggler: ClassToggleService) {
    super();
    this.http.get<User>("/api/v1/users").subscribe(res => { this.user = res; console.log(this.user);
    })
  }

  
  disconnect(){
    localStorage.clear()
    this.route.navigate(['login']);
  }

refresh(){
  let baseApiUrl = "http://localhost:3000/r";
    this.http.get(baseApiUrl).subscribe(res => {})
}


  
}
