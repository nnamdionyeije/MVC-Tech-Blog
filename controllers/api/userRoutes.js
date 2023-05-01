const router = require('express').Router();
const { User } = require('../../models');


// creating a user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        })
    } catch (err) {

    }
})

// loging in a user
router.post('/login', async (req, res) => {

});

//logging out a user
router.post('/logout', (req, res) => {

});

module.exports = router;