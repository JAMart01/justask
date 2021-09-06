const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



router.get('/', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', (req, res) => {
  Post.findAll({
      include: [
          {model: Comment, 
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User, 
          attributes: ['username']
      }
      ]
  })
    .then(dbPost => {
        const posts = dbPost.map(post => post.get({ plain: true}));
        res.render('dashboard2', {
            posts,
            loggedIn: req.session.loggedIn 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {

})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
router.get('/logout', (req, res) => {
  res.redirect('/');
  return;
});



module.exports = router;