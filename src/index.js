import app from './config/express';

function terminate() {
    mongooseConnector.disconnect();
    redisConnector.disconnect();
}
// handle close
process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
process.on('SIGUSR1', terminate);

const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
