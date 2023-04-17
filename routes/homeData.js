const express = require('express')
const { createSection, getSections, getSection, updateSection, deleteSection } = require('../controllers/homeController')
const { requireAuth } = require('../middleware/requireAuth')
const router = express.Router()

router.post('/newSection',requireAuth, createSection)
router.get('/sections', getSections)
router.get('/section/:id',requireAuth, getSection)
router.put('/section/:id',requireAuth, updateSection)
router.delete('/section/:id',requireAuth, deleteSection)

module.exports = router