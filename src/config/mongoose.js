import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import { mongo } from './var';

mongoose.Promise = Bluebird;

const connect = () => {
    mongoose.connect(mongo.uri_dev, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: 1
    });
    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:')
    );
    mongoose.connection.on('connected', () => {
        console.log('mongoose connected');
    });
    mongoose.connection.once('open', function() {
        console.log('mongoose open connection');
    });
};
const disconnect = () => {
    mongoose.disconnect();
};

module.exports = { connect, disconnect };
