import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient ) {}
    
    singUp(email:string, password:string){
        
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2JZDTR0xMqFN4RAsaALDma6-eeuivPvg',
         {
             email: email,
             password: password,
             returnSecureTokem: true
         }).pipe(catchError(this.handleErrors));
    }

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2JZDTR0xMqFN4RAsaALDma6-eeuivPvg',
        {
            email: email,
            password: password,
            returnSecureTokem: true
        }).pipe(catchError(this.handleErrors));
    };

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