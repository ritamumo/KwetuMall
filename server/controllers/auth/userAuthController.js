import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt'; //creates a hash, which is a secure string that we'll store in our database in place of our password
import jwt from 'jsonwebtoken'; //generates a token, a string that will show that a user is authenticated

const saltRound = 10;

export const register = (req, res) => {
  console.log(req.body)
  if (!req.body || !req.body.password) {
    res.send({
      message: 'User details not found',
    });
  } else {
    bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          phoneNumber: req.body.phoneNumber,
        });
        const newUser = await user.save();
        res.send({
          message: 'User created',
          data: newUser,
        });
      }
    });
  }
};
export const login = async (req, res) => {
  if (!req.body.password || !req.body.email) {
    res.send({
      message: 'Wrong password or email',
    });
  } else {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        message: 'Wrong password or email',
      });
    }else {
        bcrypt.compare(req.body.password, user.password, (err, response)=>{
            // response = true / false
            if(err){
                console.log(err)
            }
            if(response === false){
                res.send({
                    message: 'Wrong password or email',
                  });
            } else if(response === true){
                // generate a jwt token
                const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
                res.send({
                    message: 'User authenticated successfully',
                    data: user,
                    token: token
                })
            }
        })
    }
  }
};