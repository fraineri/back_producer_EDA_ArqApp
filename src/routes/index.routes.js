const express = require('express')
const router = express.Router()
const controller = require ('../controllers/index.controller')
const queueController = require ('../controllers/queue.controller')


router.post('/testQueue', queueController.PushToQueue)

router.get('/GetTestsList',controller.GetTestsList)
router.post('/SubmitAnswer',controller.SubmitAnswer)

router.get('/GetItemFromQueue', controller.GetItemFromQueue)
router.post('/SendItemToQueue', controller.SendItemToQueue)
router.post('/SubmitAnswerNoSQS', controller.SubmitAnswerNoSQS)

router.post('/SubmitAnswerNoEDA', controller.SubmitAnswerNoEDA)

router.post('/ClearTest', controller.ClearTest)
router.post('/SubmitNewTest', controller.SubmitNewTest)


module.exports = router