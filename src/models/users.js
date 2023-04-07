import { Schema, model } from "mongoose";

const userCollection = "users" //nombre de coleccion

const userSchema = new Schema({

    nombre: String,
    apellido: String,
    email: { type: String, 
             unique: true }, //permite q el mail sea unico
    edad:Number,

})

export const userModel=model(userCollection,userSchema) 