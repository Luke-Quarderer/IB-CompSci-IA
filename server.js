if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const User = require('./models/user')


const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const logRouter = require('./routes/logs')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const logoutRouter = require('./routes/logout')

const express = require('express'), 
passport = require("passport"),
LocalStrategy = require("passport-local"),
expressLayouts = require('express-ejs-layouts'),
bodyParser = require('body-parser'),
methodOverride = require('method-override')
let app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rhee",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/logs', logRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)

app.listen(process.env.PORT || 3000)

