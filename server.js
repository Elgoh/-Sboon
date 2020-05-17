if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const {MongoClient} = require('mongodb')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended : false }))
app.use('/', indexRouter);
//const uri = "mongodb+srv://WebGame:<password>@webgame-bedjh.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'));


app.listen(process.env.PORT || 3000);