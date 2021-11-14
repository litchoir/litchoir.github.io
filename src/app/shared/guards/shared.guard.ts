import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import jwtDecode from 'jwt-decode';
import { MS_IN_A_SECOND } from '../constants/shared.constants';
import { LC_COOKIE_KEY_NAME } from 'src/app/login/login.constants';

@Injectable({
  providedIn: 'root'
})
export class SharedGuard implements CanActivate {
  constructor(
    private _cookieService : CookieService,
    private router : Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    try {
      // const token = this._cookieService.get(LC_COOKIE_KEY_NAME);
      // const decodedPayload : any = jwtDecode(token);
      // const currentDate = new Date();
      // const isAuthorized = currentDate.getTime() < decodedPayload.exp * MS_IN_A_SECOND;
      // if (!isAuthorized) this.router.navigateByUrl('/login');
      // return isAuthorized;
      return true;
    } catch (err) {
      console.error(`Could not authorize route request: ${err}`)
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
