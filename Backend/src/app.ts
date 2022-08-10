
import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import path from "path";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import fileUpload from "express-fileupload";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";
dal.connect();
import productsControllers from "./06-controllers/products-controllers";
import authControllers from "./06-controllers/auth-controllers";
import cartControllers from "./06-controllers/cart-controllers";

const server = express();

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(fileUpload());


const frontendDir = path.join(__dirname, '07-frontend'); 
server.use(express.static(frontendDir)) 

server.use("/api", productsControllers);
server.use("/api", authControllers);
server.use("/api", cartControllers);



server.use("*", (request: Request, response: Response, next: NextFunction) => {
    if(config.isDevelopment) {
        next(new ErrorModel(404, "Route not found."));
    }
    else{
        const indexHTML = path.join(frontendDir, "index.html");
        response.sendFile(indexHTML);
    }
});

server.use(errorsHandler);

server.listen(process.env.PORT || 3001, () => console.log("Listening..."));
