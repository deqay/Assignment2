
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes


router.get('/products', productController.allProducts);
router.get('/products/:id', productController.productByID);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProductById);
router.delete('/products/:id', productController.removeProductById);
router.delete('/products', productController.removeAllProducts);
router.get('/products', productController.findProductByName);

module.exports = router;


