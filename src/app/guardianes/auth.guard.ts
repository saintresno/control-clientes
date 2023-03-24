import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private Router: Router,
        private afAuth: AngularFireAuth,
    ){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.pipe(
            map( auth=> {
                if(!auth){
                    this.Router.navigate(['/login']);
                    return false;
                }
                else{
                    return true;
                }
            })
        )
    }
}
