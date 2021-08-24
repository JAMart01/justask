const router = require('express').Router();

const userRoute = require('./user-routes');
const postRoute = require('./post-route');
const commentsRoute = require('./comments-route');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentsRoute);

module.exports = router;