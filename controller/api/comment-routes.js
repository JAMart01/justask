const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



// Get all Comments 
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Post,
                attributes: ['id', 'title']
            }
        ]
    })
    .then(dbComment => res.json(dbComment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Get a Comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Post,
                attributes: ['id', 'title']
            }
        ]
    })
      .then(dbComment => {
          if (!dbComment) {
              res.status(404).json({ message: 'No comment found with this id'});
          } else {
              res.json(dbComment);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


// Create a Comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbComment => res.json(dbComment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Delete a Comment by id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbComment => {
        if (!dbComment) {
            res.status(404).json({message: 'No comment found with this id'});
        } else {
            res.json(dbComment);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;