import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addfonction',
  templateUrl: './addfonction.component.html',
  styleUrls: ['./addfonction.component.scss']
})
export class AddfonctionComponent implements OnInit {

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
