import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

public constructor(private notify: NotifyService, private router:Router){}


public canActivate():boolean{
    if(store.getState().AuthState.token){
      return true;
    }
    this.notify.error('You are not logged in');
    this.router.navigateByUrl('/login');
    return false;
}
  
}
