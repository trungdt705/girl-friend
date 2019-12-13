// import .env variables
require('dotenv-safe').config();

module.exports = {
    mongo: {
        uri:
            process.env.NODE_ENV === 'test'
                ? process.env.MONGO_URI_TEST
                : process.env.MONGO_URI
    },

    redis: {
        uri: process.env.REDIS_URI
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    env: process.env.NODE_ENV
};
