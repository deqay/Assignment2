
const Product = require('../models/products');


// Get all products

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Get a product by ID

exports.productByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};


// add product 

exports.addProduct = async (req, res) => {

    const { name, description, price, quantity, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: 'Error adding the product' });
    }
  };


  

// Update a product by ID

exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete a product by ID
exports.removeProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json({ message: "Product deleted." });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

//Delete all products

exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({}); 
        res.json({ message: 'All products deleted.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



//find all products with name "kw"

exports.findProductByName = async (req, res) => {

    const { name } = req.query;
    const query = { name: { $regex: name, $options: 'i' } }; 

    try {
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



