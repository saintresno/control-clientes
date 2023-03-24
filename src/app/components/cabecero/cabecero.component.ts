import { Router } from '@angular/router';
import { loginService } from './../../Services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLogged: boolean;
  loggedInUser: string;

  constructor(
    private loginService: loginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogged = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLogged = false;
      }
    })
  }

  logOut(){
    this.loginService.logout();
    this.isLogged = false;
    this.router.navigate(['/login'])
  }

}
