const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

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



module.exports = router;