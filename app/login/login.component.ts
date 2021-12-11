import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit(): void {}

    login(userName, password){
        this.userService.checkPassword(userName, password).subscribe(result => {
            if(result){
                this.userService.isLoged = true;
                this.router.navigateByUrl('/sentences');
            } else {
                alert("Password or username incorrect");
                document.getElementById(password).innerHTML = "";
            }
        });
    }

}
