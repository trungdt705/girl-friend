// import .env variables
require('dotenv-safe').config();

module.exports = {
    mongo: {
        uri_dev: process.env.MONGO_URI
    },
    redis: {
        uri: process.env.REDIS_URI
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    env: process.env.NODE_ENV
};
