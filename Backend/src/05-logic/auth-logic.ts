import { IUserModel, UserModel } from './../03-models/user-model';
import cyber from "../01-utils/cyber";
import ErrorModel from "../03-models/error-model";
import {v4 as uuid} from "uuid"
import RoleModel from "../03-models/role-model";
import CredentialsModel from '../03-models/credentials-model';
import { UserRegisterModel } from '../03-models/user-register.model';

async function register(user:IUserModel):Promise<string>{
    
    user.role = RoleModel.User;
    // Validation:
    const errors = user.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);

    const isTaken = await isIdNumberTaken(user.idNumber);
    if(isTaken){
        throw new ErrorModel(400, `Number Id ${user.idNumber} already exists`);
    }

    user.password = cyber.hash(user.password);  

    await UserModel.create(user);

    user.password = undefined;

    const token = cyber.getNewToken(user);

    return token;
}

async function checkId(idNumber:number):Promise<boolean>{
    const isTaken = await isIdNumberTaken(idNumber);
    return isTaken;
}


async function login(credentials:CredentialsModel):Promise<string>{

    const errors = credentials.validateLogin();

    if(errors) throw new ErrorModel(400,errors);

    //hash password
    credentials.password = cyber.hash(credentials.password);

    const userLogin= await UserModel.findOne({email:credentials.email, password:credentials.password}).exec();
    

    if(!userLogin){
        throw new ErrorModel(401,`Incorrect username or password`)
    }



    userLogin.password = undefined; 
    const token = cyber.getNewToken(userLogin);

    return token;
}

async function isIdNumberTaken(userId:number):Promise<boolean>{
    const isTaken =  await UserModel.findOne({idNumber:userId}).exec();
    if(isTaken) return true;
    return false;
}




export default {
    register,
    login,
    checkId
}