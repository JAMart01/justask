const router = require('express').Router();
const { Post, User, Comment } = require('../../models');



// Get all Posts
router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
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
      .then(dbPost => res.json(dbPost))
      .catch(err => {
          console.log(err);
          res.status(500).json(err)
      });
});


// Get a single Post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
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
          if (!dbPost) {
              res.status(404).json({ message: 'No post found with that id'});
          } else {
              res.json(dbPost);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


// Create a Post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    })
      .then(dbPost => res.json(dbPost))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Update a Posts title or text by id
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPost =>{
            if (!dbPost) {
            res.status(404).json({ message: 'No post found with this id'})
            } else {
              res.json(dbPost);
            }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// Delete a Post by id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
      .then(dbPost => res.json(dbPost))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



module.exports = router;