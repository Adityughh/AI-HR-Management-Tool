const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req,res)=>{
    const {username, password, role} = req.body;
    try {
        const newUser = new User({username, password, role});
        await newUser.save()
        res.status(201).json({message:'User registered successfully'})
    } catch (err) {
        res.status(400).json({error: err.message})
    }    
})

router.post('/login', async(req,res)=>{
    const {username, password}=req.body
    try{
        const user = await User.findOne({username})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
})

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
  });
  
  module.exports = router;