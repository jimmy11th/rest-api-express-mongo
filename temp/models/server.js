// server.js

// BASE SETUP
// ===================================================

// call the packages we nedd
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTER FOR OUT API
// ===================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and don`t stop here
})

var Product = require('./models/product')
var Cart = require('./models/cart')

//test route to make sure everything is working(accessd at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'nice,服务器来了!' });
})

// more routes for our API will happen here
//新建一个成员
router.route('/products')
    .post(function(req, res) {
        var product = new Product();
        product.name = req.body.name;
        product.level = req.body.level;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.body.image;
        product.save(function(err) {
            if (err)
                res.sned(err);
            res.json({ message: 'Product created!' });
        });
    })//获取所有成员
    .get(function(req, res) {
        Product.find(function(err, products) {
              if (err)
                  res.send(err);
              res.json(products);
          });
    });

router.route('/products/:product_id')
    .get(function(req, res) {
        Product.findOne({_id:req.params.product_id}, function(err, product) {
                if (err)
                    res.send(err);
                res.json(product);
          })
    })//修改现有成员 
    .put(function(req, res) {
          Product.findOne(req.params._id, function(err, product) {
                if (err)
                    res.send(err)
                product.name = req.body.name;
                product.save(function(err) {
                      if (err)
                          res.send(err);
                      res.json({ message: 'Product updated!'})
                })
          });
    })
    .delete(function(req, res) {
          Product.deleteOne(req.params._id,function(err) {
              if (err)
                  res.send(err)
              res.json({ message: 'Successfully deleted! '});
          })
    });

//新建一个成员
router.route('/carts')
    .post(function(req, res) {
        var cart = new Cart();
        cart.owner = req.body.owner;
        cart.num = req.body.num;
        cart.product = req.body.product
        cart.save(function(err) {
            if (err)
                res.sned(err);
            res.json({ message: 'cart created!' });
        });
        
    })//获取所有成员
    .get(function(req, res) {
          Cart.find(function(err, cart) {
              if (err)
                  res.send(err);
              res.json(cart);
          }).populate('product').
          exec(function(err, product){
              if (err) return handleError(err);
          })
    });
   
router.route('/carts/:cart_id')
    .get(function(req, res) {
          Cart.findOne({product:req.query.product_id}, function(err, cart) {
                if (err)
                    res.send(err);
                res.json(cart);
          }).
          populate('product').
            exec(function(err, product){
                if (err) return handleError(err);
            })
    })//修改现有成员 
    .put(function(req, res) {
          Cart.findOne({_id:req.params.cart_id}, function(err, cart) {
                if (err)
                    res.send(err)
                cart.num = req.body.num;
                cart.save(function(err) {
                      if (err)
                          res.send(err);
                      res.json({ message: 'cart updated!'})
                })
          });
    })
    .delete(function(req, res) {
          Cart.deleteOne(
              req.params._id
          , function(err) {
              if (err)
                  res.send(err)
              res.json({ message: 'Successfully deleted! '});
          })
    });

//获取相应的商品
    // .get(function(req, res) {
    //     Cart.
    //         findOne({owner:req.params.owner}).
    //         populate('product').
    //         exec(function(err, product){
    //             if (err)
    //                 res.send(err);
    //             res.json(product);
    //         })
    //   })


// REGISTER OUR ROUTES ----------------------
// all of our routes will be prefixed with /api
app.use('/api', router)

// START THE SERVER
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bear', function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at localhost:27017`)
        }
    });
});