const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});

dotenv.config({ path: "BACKEND/config/config.env" });

// connect to database
connectDatabase();

const server = app.listen(process.env.PORT,() => {
    console.log(`Listening on port ${process.env.PORT}`);
})



// unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});
