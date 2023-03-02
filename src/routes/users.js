const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.json(users);
});

router.post('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const { name, username, email, address, phone, website, company} = req.body;
    if (name && username && email && address && phone && website && company)
    {
        const id = users.length + 1;
        const newUser = {...req.body, id};
        users.push(newUser);
        res.json(users);
    }
    else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const {id} = req.params;
    const { name, username, email, phone, website} = req.body;
    if (name && username && email && phone && website)
    {
        _.each(users, (user, i) => {
            if(user.id == id){
                user.name = name;
                user.username = username;
                user.email = email;
                user.phone = phone;
                user.website = website;
            }
        });
        res.json(users);
    }else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    _.each(users, (user, i) => {
        if (user.id == id){
            users.splice(i, 1);
        }
    });
    res.send(users);
});

module.exports = router;