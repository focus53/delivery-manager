const { Router } = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { getDates, createDelivery, deleteDelivery } = require('../controllers/deliveryControllers');

const router = Router();

// /api/date/
router.get('/', authMiddleware, getDates);

// /api/date
router.post('/create_address', createDelivery);

// /api/date/delete_address
router.post('/delete_address', deleteDelivery);

module.exports = router;
