const router = require('express').Router()
const controller = require('../controllers/index')

/** POST ROUTE */
router.route('/adduser').get(controller.addUserByCreate)
router.route('/addusers').post(controller.addUsers)
router.route('/adduser').post(controller.addUser)

/** GET ROUTE */
router.route('/getusers').get(controller.getUsers)
router.route('/getuser/:id').get(controller.getUser)
router.route('/query').get(controller.queryUser)
router.route('/finder-query').get(controller.finderQueryUser)
router.route('/get-set-virtual').get(controller.getSetVirtualUser)
router.route('/validate-constraint').get(controller.validateConstraintUser)
router.route('/raw-queries').get(controller.rawQueriesUser)
router.route('/one-to-one').get(controller.oneToOneUser)
router.route('/one-to-many').get(controller.oneToManyUser)
router.route('/many-to-many').get(controller.manyToManyUser)

/** DELETE ROUTE */
router.route('/patchuser/:id').patch(controller.patchUser)

/** DELETE ROUTE */
router.route('/deleteuser/:id').delete(controller.deleteUser)

module.exports = router