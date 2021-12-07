const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')		


// const config = require("./config/key");	// mongoDB 설정 파일

const mongoose = require("mongoose");
const url = "mongodb+srv://Ankur123:djdjank123@ankur0.221bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

AdminBro.registerAdapter(AdminBroMongoose)	

const adminBro = new AdminBro({
  databases: [ mongoose ]	
})

const ADMIN = {
  email: 'admin@a.aa',
  password: '12341234'
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: 'adminBro',	
  cookiePassword: 'testtest',
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
      return null
    },
  }, null, {
    resave: false,
    saveUninitialized: true,	
});


module.exports = router


