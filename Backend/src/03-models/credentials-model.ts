import Joi from "joi";

class CredentialsModel{
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel){
        this.email = credentials.email;
        this.password = credentials.password;

    }

    private static loginSchema = Joi.object({
        email: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2).max(30),

   });

   public validateLogin():string{
       const result = CredentialsModel.loginSchema.validate(this);

       return result.error?.message;

   };
}

export default CredentialsModel