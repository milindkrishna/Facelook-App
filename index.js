const express = require('express');
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// expresslayout import
const expresslayout = require('express-ejs-layouts');

const db = require('./config/mongoose')

//used for session cookies passport
const session = require('express-session')
const passport = require('passport')

// passportlocal config file import
const passportLocal = require('./config/passport-local-strategy');
// passport-jwt config file import
const passportJWT = require('./config/passport-jwt-strategy')
// passportgoogle config file import
const passportgoogle = require('./config/passport-google-oauth-strategy')
const MongoStore = require('connect-mongo')
// SCSS Setup
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const customMware = require('./config/middleware')



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css' 
}))




app.use(express.urlencoded());
app.use(cookieParser());


// for static folders
app.use(express.static('./assets'))

// make the upload available to browser
app.use('/upload',express.static(__dirname + '/upload'));

// using it in express 
app.use(expresslayout);

// extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        
            mongoUrl: 'mongodb://localhost:27017/codeial',
            autoRemove: 'disabled'
        
    },
    function(err){
        console.log(err || 'connectmongo setup OK');
    }
    )
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

// middleware for ratelimiter
// const apiLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     message:
// 		'Too many accounts created from this IP, please try again after an hour',
// })

// app.use(apiLimiter);

app.use(flash());
app.use(customMware.setFlash)
// use express router from routes
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);

    }
    console.log(`Server is running on port : ${port}`);
})