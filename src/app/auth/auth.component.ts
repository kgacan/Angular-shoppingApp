import { AuthService, AuthResponseData } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(private authService: AuthService) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }
    else
    {
      authObs = this.authService.singUp(email, password);
    }

    authObs.subscribe(responseData =>{
      console.log(responseData);
      this.isLoading = false;
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

}