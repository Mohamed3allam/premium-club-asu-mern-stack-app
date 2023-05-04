const express = require('express')
const { createSection, getSections, getSection, updateSection, deleteSection } = require('../controllers/homeController')
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')
const router = express.Router()

router.post('/newSection', requireAuth, grantAccess('updateAny', 'website'), createSection)
router.get('/sections', getSections)
router.get('/section/:id', getSection)
router.put('/section/:id', requireAuth, grantAccess('updateAny', 'website'), updateSection)
router.delete('/section/:id', requireAuth, grantAccess('updateAny', 'website'), deleteSection)

module.exports = router