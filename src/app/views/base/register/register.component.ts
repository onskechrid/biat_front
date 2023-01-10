import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form !: FormGroup

  constructor(private formBuilder : FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(){

   let user : User = this.form.getRawValue()

   console.log(user);
   
   this.http.post<boolean>("/api/v1/users/signup", user).subscribe(res =>{
    console.log(res);
  })

  }
}
