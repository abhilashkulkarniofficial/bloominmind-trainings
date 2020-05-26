'use strict';

var express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var router = express.Router();

function readFile(){
    let data = fs.readFileSync('user_data.json');
    let users = JSON.parse(data);
    return users;
}

function writeFile(users){
    let data = JSON.stringify(users);
    fs.writeFileSync('user_data.json', data);
}

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

// Middleware to get current Date
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Define the about route
// router.get('/*', function(req, res) {
//     res.send('404 Error');
// });

// Define route for creating new User
router.post('/createUser', function(req, res) {
    console.log('CREATE User called');
    let user = {
        "name" : req.query.name,
        "email" : req.query.email
    }
    let users = readFile();
    users[req.query.phone] = user;
    writeFile(users);
    res.send('User created successfully');
});

// Define route for updating a user
router.post('/updateUser', function(req, res){
    console.log('UPDATE user called');
    let user = {
        "name" : req.query.name,
        "email" : req.query.email
    }
    let users = readFile();
    users[req.query.phone] = user;
    writeFile(users);
    res.send('User updated successfully');
});

// Define route to get user or a specific user
router.get('/getUser', function(req, res){
    console.log('GET User called');
    if(req.query.token === 'bloominmind'){
        if(req.query.phone === undefined){
            res.send(readFile());
        }else{
            console.log('User search with ID ' + req.query.phone)
            let users = readFile();
            res.send(users[req.query.phone]);
        }
    }else{
        res.send("Not authorized to view users.");
    }
    
});

// Define route to delete a specific user
router.delete('/deleteUser', function(req, res){
    console.log('DELETE User called');
    if(req.query.token === 'bloominmind'){
        let users = readFile();
    delete users[req.query.phone];
    writeFile(users);
    res.send('User deleted successfully');
    }else{
        res.send("Not authorized to delete users.");
    }
})

module.exports = router;