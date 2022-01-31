const express = require('express');
router = express.Router();
storyRoute = require('./story')

router.use('/api/game', storyRoute.holeStory)

module.exports = router;
