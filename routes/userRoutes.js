const express = require('express')
const User = require('../models/user')

const router = express.Router();


/**
 * Reusable - Get user by Id 
 */
const getUserById = async (req, res, next) =>{

    let user;

    try {
        
        user = await User.findById(req.params.id)

        if (user == null) {
            
            return res.status(404).json({ message : "Couldn't find user"})
            
        }

    } catch (error) {
        
        return res.status(500).json({ message: error.message})
    }

    res.user = user

    next()
}

//Create user 
router.post('/', async (req, res) => {

    const user = new User({
        username: req.body.username,
        emailaddress: req.body.emailaddress,
        age: req.body.age    
    })

    try {
        
        const newUser = await user.save()

        res.status(201).json(newUser)

    } catch (error) {

        res.status(400).json({ message: error.message})
        
    }
})

//Get all users
router.get('/', async (req, res) => {
   
    try {
        
        const users = await User.find();

        res.json(users)

    } catch (error) {
        
        res.status(500).json({ message: error.message})
    }
})


//Get user with id
router.get('/:id', getUserById, (req, res) => {
    
    const user = res.user

    res.json(user)

})


//Update user with id
router.put('/:id', getUserById, async (req, res) => {

    if (req.body.username != null) {
        res.user.username = req.body.username
    }

    if (req.body.emailaddress != null) {
        res.user.emailaddress = req.body.emailaddress
    }

    if (req.body.age != null) {
        res.user.age = req.body.age
    }

    try {
        
        const updateUser = await res.user.save()

        res.json(updateUser)

    } catch (error) {

        res.status(400).json({ message : error.message})
        
    }


})


//Delete user with id
router.delete('/:id', getUserById, async (req, res) => {
    
    try {
        
        await res.user.remove()
        res.json({ message : "Deleted successfully"})

    } catch (error) {

        res.status(500).json({ message : error.message })
        
    }
})


module.exports = router;