import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate  {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot)
                : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.authService.user.pipe(
            take(1),
            map(
            user => {
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }
        ));
    }

}