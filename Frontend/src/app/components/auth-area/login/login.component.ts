import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = new CredentialsModel();

  constructor(private authService: AuthService,private notify: NotifyService, private router : Router ) { }

  ngOnInit(): void {
  }
  async login():Promise<void>{
    try{
      await this.authService.login(this.credentials);
      this.notify.success("Login Successful");
      this.router.navigateByUrl("/home");
    }
    catch(err:any){
      this.notify.error(err);   
    }
  }

}
