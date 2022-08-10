import express, { NextFunction, Request, Response } from "express"
import CredentialsModel from "../03-models/credentials-model";
import { UserModel } from "../03-models/user-model";
import { UserRegisterModel } from "../03-models/user-register.model";
import authLogic from "../05-logic/auth-logic";

const router = express.Router();


router.post("/auth/register", async (request:Request, response:Response, next:NextFunction)=> {
    try{
        const user = new UserModel(request.body);
        const isTaken = await authLogic.register(user)
        response.status(201).json(isTaken)
    }

    catch(err:any){
        next(err)
    }
});

router.post("/auth/check", async (request:Request, response:Response, next:NextFunction)=> {
    try{
        const user = new UserRegisterModel(request.body)

        console.log(user.idNumber)
        const isTaken = await authLogic.checkId(user.idNumber)
        response.json(isTaken)

    }

    catch(err:any){
        next(err)
    }
});


router.post("/auth/login", async (request:Request, response:Response, next:NextFunction)=>{
    try{
        console.log("login 1")
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        console.log("login")
        response.json(token);

    }
    catch(err:any){
        next(err);

    }

});

export default router;