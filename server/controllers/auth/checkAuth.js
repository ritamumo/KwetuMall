//1. checking if the user has a token
//2. verify the token
//3. get the user who owns the token
//4. continue to any other function

import jwt from 'jsonwebtoken'
import userModel from '../../models/userModel.js'

const checkAuth = (req, res, next)=>{
    const {authorization} = req.headers;
    //Bearer hjhjijklvfhgertygfdl
    if(!authorization){
        res.send({
            message: 'You must be logged in'
        })
    }else{
        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, 'MY_SECRET_KEY', async(err, data)=>{
            if(err){
                console.log(err)
                res.send({
                    message: 'You must be logged in'
                })
            }else{
                const user = await userModel.findOne({_id:data.userId});
                req.user = user;
                next();
            }
        })
    }
}
export default checkAuth