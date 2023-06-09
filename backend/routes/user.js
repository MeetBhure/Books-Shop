const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/registerUser' , async (req,res,next) => {
    const {name,email,password} = req.body
    Users.findOne({email:email}).then((user) => {
        
        if(user){
            return res.status(400).json({email:"Email already exists"});
        }else{

            const newUser = new Users({
                name,
                email,
                password 
            })
            const rounds = 10
            bcrypt.genSalt(rounds , (err,salt) => {
                bcrypt.hash(password,salt, async (err,hash) => {
                    if(err) throw err
                    newUser.password = hash
                 
                    
                    const savedUser = await newUser.save()

                    const payload = {
                        id: savedUser.id,
                        name: savedUser.name,
                        email: savedUser.email
                    }

                    jwt.sign(
                        payload,
                        "secret",
                        {
                            expiresIn: 31556926 
                        },
                        (err,token) => {
                            res.json({
                                sucess: true,
                                data: savedUser,
                                token: "Bearer " + token
                            })
                        }
                    )
                    // .then((user) => res.json({data: user}))
                    // .catch(err => console.log(err))
                })
            })

        }
    })
})

router.post('/loginUser' , (req,res,next) => {
    const {email, password} = req.body
    Users.findOne({email:email}).then((user) => {
        if(!user){
            res.status(400).json({email: "User is not exist"})
        }else{
            bcrypt.compare(password,user.password).then((isMatch) => {
                if(!isMatch){
                    res.status(400).json({password: "The password was incorrect"})
                }else {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                    jwt.sign(
                        payload,
                        "secret",
                        {
                            expiresIn: 31556926 
                        },
                        (err,token) => {
                            res.json({
                                sucess: true,
                                token: "Bearer " + token
                            })
                        }
                    )
                }
            })
        }
    })
})

module.exports = router;
