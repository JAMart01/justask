const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
  
// Get all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


// Get a User by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
      .then(dbUser => {
          if(!dbUser){
              res.status(404).json({ message: 'No user found with this id'});
          } else {
              res.json(dbUser);
          }
      })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a User
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
          username: req.body.username
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that username!' });
          return;
        }
    
        const validPassword = dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
      });
})

// Update a User by id
router.put('/:id', (req, res) => {
    User.update(req.body,{
        where: {
            id: req.params.id
        }
    })
      .then(dbUser =>{
          if (!dbUser) {
              res.status(404).json({ message: 'No user found with this id'});
          } else {
              res.json(dbUser);
          }
      })
      .catch(err =>{
          console.log(err);
          res.status(500).json(err);
      });
});


// Delete a User by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
      .then(dbUser => {
          if(!dbUser) {
              res.status(404).json({ message: 'No user found with id'});
          } else {
              res.json(dbUser);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



module.exports = router;