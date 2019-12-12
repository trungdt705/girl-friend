import Redis from 'ioredis';
import Bluebird from 'bluebird';
import { redis } from './var';

const client = new Redis(redis.uri);
Redis.Promise = Bluebird;

Bluebird.promisifyAll(Redis);
Bluebird.promisifyAll(Redis.prototype);

const connect = () => {
    client.on('connected', function() {
        console.log('Redis client connected');
    });

    client.on('close', function() {
        console.log('Redis client close');
    });

    client.on('error', function(err) {
        console.log('Something went wrong ' + err);
    });
};

const disconnect = () => {
    client.disconnect();
};

module.exports = { connect, disconnect, client };
