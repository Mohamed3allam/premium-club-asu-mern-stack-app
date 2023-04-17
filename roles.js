'use strict'

const AccessControl = require('accesscontrol')
const ac = new AccessControl()

const roles = () => {
    ac.grant('Guest')

    ac.grant("Member")
        .readOwn('profile')
        .updateOwn('profile')
        .readAny('profile')

    ac.grant("Vice Head")
        .extend('Member')

    ac.grant("Head")
        .extend('Vice Head')
    
    ac.grant("Vice President")
        .extend('Head')

        .createAny('profile')
        .updateAny('profile')
        .deleteAny('profile')

        .updateOwn('highboardProfile')

    ac.grant("President")
        .extend('Vice President')
        .updateAny('highboardProfile')
        .deleteAny('highBoardProfile')
        .updateAny('website')

    return ac
}

module.exports = { roles }