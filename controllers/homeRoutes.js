const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/', async (req, res) => {
    try {

        const pageData = await Post.findAll({
            // 
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// get a single post
router.get('/:id', async (req, res) => {
    try {

        const postData = await Post.findByPk(req.params.id, {
            include: [ User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const posts = postData.map((post).get({ plain: true}));

        res.render('singlePosts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth middleware the prevent access for unlogged users
router.get('./profile', withAuth, async (req, res) => {

});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;

