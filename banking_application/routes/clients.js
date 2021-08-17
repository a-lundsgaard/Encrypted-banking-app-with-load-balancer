const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clients');


router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getSingleClient);
router.post('/', clientController.addClient);
router.put('/:id', clientController.updateSingleClient);
router.delete('/:id', clientController.deleteSingleClient);

module.exports = router;