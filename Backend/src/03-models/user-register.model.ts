export class UserRegisterModel {
    email: string;
    password: string;
    confirmPassword:string
    idNumber: number;
    constructor(user:UserRegisterModel){
        this.email = user.email;
        this.password = user.password;
        this.confirmPassword = user.confirmPassword;
        this.idNumber = user.idNumber;
    }
}