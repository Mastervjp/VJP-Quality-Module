import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }
  
  canActivate() {
    if (this.auth.isSuperAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
}
  
}
