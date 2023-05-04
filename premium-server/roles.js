'use strict'

const AccessControl = require('accesscontrol')
const ac = new AccessControl()

const roles = () => {
    ac.grant('Guest')


    // Main Scopes for each role
    ac.grant("Member")
        .readOwn('profile')
        .readOwn('committee')
        .updateOwn('user')
        .readAny('user')
        .readOwn('evaluation')

    ac.grant("Vice Head")
        .extend('Member')

    ac.grant("Head")
        .extend('Vice Head')
    
    ac.grant("HR Head")
        .extend("Head")
        .updateAny('evaluation')

    ac.grant("Vice President")
        .extend('HR Head')
        
        .createAny('user')
        .updateAny('user')
        .deleteAny('user')

        .updateOwn('highboard_profile')


    ac.grant("President")
        .extend('Vice President')
        .updateAny('highboard_user')
        .deleteAny('highboard_user')
        .updateAny('website')
        

    return ac
}

module.exports = { roles }