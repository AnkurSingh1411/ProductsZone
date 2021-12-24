require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const multer = require("multer")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {authpage} = require('./middleware')
require('./mongo')
require('./passport_setup')
require('./error_handler')
const cookieSession = require('cookie-session');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const ProductRouter = require('./routes/product');
const authrouter = require('./routes/authroute')

const categoryrouter= require('./routes/categoryroute')
// Order Management Route
// const authRoutes = require("./routes/auth");
const OrderRouter = require("./routes/order")
const wishlistRouter = require("./routes/Wishlist")
const cartRouter = require("./routes/cart")
// payment Gateways routes
const paymentRouter = require("./routes/payment_gateway")
const fbauth = require("./facebookpassport")
const passport = require ("passport");
const errhandler = require("./error_handler");
// const { profile } = require("console");
// const { resolveSoa } = require("dns");
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// mentioning seedAdmin function here 

// const {seedAdmin} = require('./controllers/authcontroller')
// console.log(seedAdmin())
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);

app.use('/api/product', ProductRouter);
app.use('/auth',authrouter);
// app.use('/admin',Adminrouter);
// app.use('/vendor',Vendorrouter)
app.use('/profile', express.static('upload/images'));
app.use('/api',categoryrouter)
app.use('/order',OrderRouter)
app.use('/wishlist',wishlistRouter)
app.use('/cart',cartRouter)
app.use('/',paymentRouter)
// app.use("/api", authRoutes);
app.use("/auth",fbauth)
app.use(errhandler)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// Getting App 

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error',err.message);
});

module.exports = app
