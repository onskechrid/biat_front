import { Component, OnInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';


@Component({
  selector: 'app-editfonction',
  templateUrl: './editfonction.component.html',
  styleUrls: ['./editfonction.component.scss'],
})
export class EditfonctionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
