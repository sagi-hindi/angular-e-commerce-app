import jwtDecode from "jwt-decode";
import { UserModel } from "../models/user.model";

export class AuthState{
    public user: UserModel = null;
    public token: string = null;

    public constructor(){
        this.token = localStorage.getItem("token")
        if(this.token){
        const encodedObject : any = jwtDecode(this.token)
        this.user = encodedObject.user;

        }
    }

}

export enum AuthActionType {
    register = "register",
    login = "login",
    logout = "logout",

}
export interface AuthAction{
    type:AuthActionType;
    payload?: string;
}

export function registerAction(token: string):AuthAction{
    return {type:AuthActionType.register, payload: token};

}

export function loginAction(token: string):AuthAction{
    return {type:AuthActionType.login, payload: token};

}

export function logoutAction():AuthAction{
    return { type:AuthActionType.logout };

}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState{

    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.register:
        case AuthActionType.login:
        newState.token = action.payload
        const encodedObject : any = jwtDecode(newState.token)
        newState.user = encodedObject.user;
        localStorage.setItem("token", newState.token)
        break;            
        case AuthActionType.logout:
            newState.token= null;
            newState.user= null;
            localStorage.removeItem("token")
         break;
            



    }

    return newState

}