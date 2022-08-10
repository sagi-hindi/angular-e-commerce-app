import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterModel } from 'src/app/models/user-register.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userRegister = new UserRegisterModel();
  public validateEmail:boolean = true;
  
  public isSubmit:boolean = false; 

  public user = new UserModel();

  constructor(private authService: AuthService,private notify: NotifyService, private router : Router ) { }

  ngOnInit(): void {
  }

  public async submit(){
    try{
        const newUser = await this.authService.checkId(this.userRegister);
        if(newUser){
          this.notify.error("National Id already exist");

        }
        else{
          this.isSubmit = true;
        }
      }
    catch(err:any){
    this.notify.error(err);     
    }
  }

  public newSubmit(){
    try{
      this.user.idNumber = this.userRegister.idNumber;
      this.user.email = this.userRegister.email;
      this.user.password = this.userRegister.password;
      this.authService.register(this.user);
      this.notify.success("Registration successful");
      this.router.navigateByUrl("/home");
    }
    catch(err:any){
      this.notify.error(err);   
  }

  }
}
