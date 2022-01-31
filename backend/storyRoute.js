const express = require('express');
const router = express.Router();
storyRoute = require('./story')

router.get('/api/game', storyRoute.story)

module.exports = router;