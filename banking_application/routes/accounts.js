const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');


router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getSingleAccount);
router.get('/:id/balance', accountController.getBalanceOfSingleAccount);
router.post('/', accountController.addAccount);
router.put('/transfer', accountController.transferBetweenAccounts);
router.put('/:id', accountController.updateSingleAccount);
router.delete('/:id', accountController.deleteSingleAccount);

module.exports = router;