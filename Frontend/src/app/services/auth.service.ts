import { UserRegisterModel } from 'src/app/models/user-register.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(user:UserModel):Promise<void>{
  const token = await firstValueFrom(this.http.post<string>(environment.registerUrl, user));
  store.dispatch(registerAction(token));
  }

  public async checkId(user:UserRegisterModel):Promise<boolean>{
    const isTaken = await firstValueFrom(this.http.post<boolean>(environment.checkUrl, user));
    console.log(isTaken)
    return isTaken;
  }

  public async login(credentials:CredentialsModel):Promise<void>{
    const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials));
    store.dispatch(loginAction(token));
  }

  public async logout():Promise<void>{
    store.getState().CartItemsState.cartItems = [];
    store.dispatch(logoutAction());
  }
  }

