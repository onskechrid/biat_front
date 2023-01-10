import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessToken } from '../../../models/AccessToken'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup;
  submitted = false;

  constructor(private formBuilder:FormBuilder,private http:HttpClient, private route:Router) {
    console.log(localStorage.getItem('token'));
  }


  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.route.navigate(['dashboard']);
      return;
    }
    this.LoginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(4)]]
    })

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.LoginForm.value);
    
    if (this.LoginForm.invalid) {
      return;
    }else{
      console.log("Eeee");
      
      this.http.post<AccessToken>("/api/v1/auth/login", this.LoginForm.value).subscribe(res =>{
        console.log(res);
        
        if(res != null){
          localStorage.setItem('token', res.access_token);
          this.route.navigate(['dashboard'])
        }else{
          this.route.navigate(['login']) 
        }
      })
    }
  }

}
