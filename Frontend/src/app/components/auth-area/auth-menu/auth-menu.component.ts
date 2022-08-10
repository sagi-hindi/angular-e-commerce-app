import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit, OnDestroy {
  
  public user: UserModel; 
  private unsubscribe: Unsubscribe;

  constructor() { }

  ngOnInit(): void {
    this.user = store.getState().AuthState.user;
    this.unsubscribe = store.subscribe(() => {
     this.user = store.getState().AuthState.user;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
