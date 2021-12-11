import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * Guard
 */
export class LoggedInUsersGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService){}
  
  canActivate() {
    if(!this.userService.isLoged){
      alert("You have to login first");
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
