const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/', async (req, res) => {
    try {

        const pageData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                },
            ]
        });

        const postsAll = pageData.map((post) => post.get({ plain: true}));

        res.render("homepage", {
            postsAll,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// get a single post
router.get('/post/:id', async (req, res) => {
    try {

        const pageData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                },
                {
                    model: Comment,
                    include: [User]
                }
            ],
        });

        const posts = pageData.get({ plain: true });

        res.render("singlepost", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth middleware the prevent access for unlogged users
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render("dashboard", {
            ...user,
            logged_in: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
      }
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render("login");
});

router.get('/updatedpost/:id', async (req, res) => {
    try {
        const updateData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                },
            ],
        });

        const updatedPost = updateData.get({ plain: true });

        res.render("updatedpost", {
            updatedPost,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;

