const mongoose =  require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const password = process.env.PASSWORD;
const atlas = process.env.ATLAS;
const userid = process.env.USER;
//console.log('Process.env.PASSWORD:'+password);

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb+srv://'+ userid + ':'+password+'@' + atlas +'?retryWrites=true&w=majority',{useNewUrlParser: true}, (error) => {
        if (error) {
            console.log ('DB connection error', error);
        } else {
            console.log ('DB connection success');
        }
    });
};

mongoose.connection.on ('error', (error) => {
    console.error ("DB Connection error", error);
});
mongoose.connection.on('disconnected', () => {
    console.error('The connection is disconnected, try to connect again');
    connect();
});
module.exports = connect;
