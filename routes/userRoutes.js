const { 
    getUser, 
    getUsers, 
    updateUser, 
    deleteUser, 
    updateHighboard, 
    deleteHighboard, 
    getHighboard, 
    getBoard, 
    getMembers, 
    getMediaMembers, 
    getMarketingMembers,
    getEventsMembers,
    getHRMembers,
    getPRMembers,
    getLogisticsMembers,
    getACMembers
} = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')

router.get('/allusers',requireAuth, getUsers)
router.get('/highboard',requireAuth, getHighboard)
router.get('/board',requireAuth, getBoard)
router.get('/members',requireAuth, getMembers)
router.get('/media',requireAuth, getMediaMembers)
router.get('/marketing',requireAuth, getMarketingMembers)
router.get('/events',requireAuth, getEventsMembers)
router.get('/human-resources',requireAuth, getHRMembers)
router.get('/public-relations',requireAuth, getPRMembers)
router.get('/logistics',requireAuth, getLogisticsMembers)
router.get('/academic',requireAuth, getACMembers)
router.get('/user/:id', requireAuth, getUser)

router.put('/edit-user/:id', requireAuth, grantAccess('updateAny', 'profile'), updateUser)
router.put('/edit-highboard/:id', requireAuth, grantAccess('updateAny', 'highboardProfile'), updateHighboard)

router.delete('/edit-user/:id', requireAuth, grantAccess('deleteAny', 'profile'), deleteUser)
router.delete('/edit-highboard/:id', requireAuth, grantAccess('deleteAny', 'highboardProfile'), deleteHighboard)

module.exports = router