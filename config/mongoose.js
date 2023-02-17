const mongoose = require('mongoose');

// connect mongodb compass here
//mongoose.connect('mongodb://localhost:27017/codeial',{useNewUrlParser: true});

// connect mongodb atlas here
mongoose.connect('mongodb+srv://milind:e2UXUZMkRC6vZGo4@facelook.iz52fh5.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true});


const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to database'));

db.once('open',function(){
    console.log('Connected to database : MongoDB');
});

module.exports = db;