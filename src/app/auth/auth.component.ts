
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PlaceholderDirectives } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirectives, {static: false}) alertHost: PlaceholderDirectives;

  private closeSub: Subscription;


  constructor(private authService: AuthService,private router: Router, private componentFactoryComponent: ComponentFactoryResolver) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
    
    
  }
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
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
      this.router.navigate(['./recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryComponent.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}
