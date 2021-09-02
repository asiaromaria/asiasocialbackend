const { Product, validate } = require("../models/products");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

//All endpoints and routen handlers go here.

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//expecting an id to be passed into the requestor’s URL endpoint. 
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
    });
    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//
// try {
//     const { error } = validateUser(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     let user = await User.findOne({ email: req.body.email });
//     if (user) return res.status(400).send('User already registered.');
//     const salt = await bcrypt.genSalt(10);
//     user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: await bcrypt.hash(req.body.password, salt),
//     });
//     await user.save();
//     const  token  =  user.generateAuthToken();
//     return res
//     .header('x-auth-token', token)
//     .header('access-control-expose-headers', 'x-auth-token')
//     .send({ _id: user._id, name: user.name, email: user.email }); 
//     } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
// });

router.put('/:id', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      },
      { new: true }
    );
    if (!product)
      return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    
    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product)
      return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
