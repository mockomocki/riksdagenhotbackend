var express = require('express');
var router = express.Router();


var riksdag_controller = require('../controllers/riksdagroutes');


router.get('/getriksdag', riksdag_controller.riksdagen_bilder);

router.post('/postriksdag', riksdag_controller.riskdagen_elorating);

router.get('/helloman', riksdag_controller.getDATA)

router.post('/updateraelo',riksdag_controller.updateELO)

router.get('/top10', riksdag_controller.findtop10elo)

module.exports = router;