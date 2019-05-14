import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {JwtDecoder} from '../../helpers/jwt-decoder/jwt-decoder';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    let decodedUser;
    let requiredRoles;
    if (currentUser) {
      decodedUser = JwtDecoder.decodeToken(currentUser.token);
      requiredRoles = route.data.requiredRoles;
    }

    if (currentUser) {
        if (decodedUser.roles.some(r => requiredRoles.includes(r))) {
          return true;
        }

        this.router.navigate(['/']);
        return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
