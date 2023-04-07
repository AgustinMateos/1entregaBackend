import {Router} from "express"
import {userModel} from "../models/users.js"

const userRouter = Router()

userRouter.get('/',async(req,res)=>{
    try {
        const users=await userModel.find()
        res.send({resultado: 'success', valores:users})
    } catch (error) {
        res.send("error en consulta a users, mensaje" , error.message)
    }
})

export default userRouter  // una vez generada la ruta se agrega al index