import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginUserData = {}
  constructor(public _auth: AuthService) { }

  ngOnInit(){

  }

  loginUser(){
    console.log("eriopfghj");
    
    this._auth.loginUser(this.loginUserData).subscribe( res=> console.log(res), err=> console.log(err))
  }
}