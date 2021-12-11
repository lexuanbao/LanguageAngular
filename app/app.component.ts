import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-nihon-project';

  constructor(private router: Router, public loginService: UserService){}
  
  backHome(){
    this.router.navigateByUrl('/sentences');
  }

  logout(){
    this.loginService.isLoged = false;
    this.router.navigateByUrl('/login');
  }
}
