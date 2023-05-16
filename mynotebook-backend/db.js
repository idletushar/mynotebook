const mongoose = require('mongoose');
const mongoURI = "";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connected')
    })
}

module.exports = connectToMongo;