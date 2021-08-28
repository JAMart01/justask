const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.post('/signup', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }); 

  
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