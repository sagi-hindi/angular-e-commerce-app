import { UserModel } from './../../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  public user : UserModel;
  private unsubscribe: Unsubscribe;
  public isDisplay:boolean = false;
  public isAdmin:boolean = false;

  

  constructor(public nav:NavBarService) { }

  ngOnInit(): void {
    this.user = store.getState().AuthState.user;
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().AuthState.user;
    })

  }

  
  ngOnDestroy(): void {
    this.unsubscribe();

  }
  public display(){
    this.nav.toggle();
  }

}


