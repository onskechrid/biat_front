import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassToggleService, HeaderComponent, INavData } from '@coreui/angular';
import { navItems } from '../_nav';



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
  public navItems = navItems;


  constructor(private http : HttpClient, private classToggler: ClassToggleService) {
    super();
  }

  
  
refresh(){
  let baseApiUrl = "http://localhost:3000/r";
    this.http.get(baseApiUrl).subscribe(res => {})
}

  
}
