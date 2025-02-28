const { getUsersService } = require('../service/user.service')

async function getUsers(req, res) {
    const result = getUsersService(req, res)
    return result
}

module.exports = {
    getUsers
}