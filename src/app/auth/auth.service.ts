import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/Operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment} from '../../environments/environment';

import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null); 
    token: string = null;
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router ) {}

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    
    singUp(email:string, password:string){
        
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
         {
             email: email,
             password: password,
             returnSecureToken: true
         }).pipe(catchError(this.handleErrors), tap(resData => {
             this.handleAuthentification(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
         }));
    }

    login(email:string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleErrors), tap(resData => {
            this.handleAuthentification(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
        }));  
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentification(email:string, userid: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userid, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleErrors(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error occured!";
        if(!errorRes.error || !errorRes.error.error){
           return throwError(errorMessage);
        }  
        switch(errorRes.error.error.message){
           case 'EMAIL_EXISTS':
             errorMessage= 'The email address is already in use by another account.';
             break;
           case 'EMAIL_NOT_FOUND':
               errorMessage='The email does not exist!';
               break;
            case 'INVALID_PASSWORD':
                errorMessage='The password is not correct';
                break;
           } 
        return throwError(errorMessage);
    }
}