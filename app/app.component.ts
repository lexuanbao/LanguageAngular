import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-nihon-project';

  constructor(private router: Router){}

  btnHomeOnclick(){
    this.router.navigateByUrl('/sentences');
  }
}
