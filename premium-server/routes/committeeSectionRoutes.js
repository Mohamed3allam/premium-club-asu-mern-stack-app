const express = require('express')
const { createSection, getSections, getSection, updateSection, deleteSection } = require('../controllers/homeController')
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')
const { 
    createCommitteeSection, 
    editCommitteeSection, 
    getCommitteeSections, 
    deleteCommitteeSection,
    getSingleCommitteeSection,
    getAllCommitteeSections
} = require('../controllers/committeeSectionsController')
const router = express.Router()


router.post('/:committeeId/create-committee-section', requireAuth, grantAccess('updateAny', 'website'), createCommitteeSection)

router.get('/:committeeId/sections', getCommitteeSections)
router.get('/committee-section/:committeeSectionId', getSingleCommitteeSection)
router.get('/committee-sections', getAllCommitteeSections)

router.put('/committee-section/:committeeSectionId', requireAuth, grantAccess('updateAny', 'website'), editCommitteeSection)

router.delete('/committee-section/:committeeSectionId', requireAuth, grantAccess('updateAny', 'website'), deleteCommitteeSection)

module.exports = router