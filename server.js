const express = require('express')
const dotenv = require('dotenv')
//const logger = require('./middleware/logger')
const morgan = require('morgan');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

// load env vars
dotenv.config({ path: './config/config.env' })

// connect to datatbase
connectDB()

const bootcamps = require('./routes/bootcamps')


const app = express();


// body parser to use is with req.body
app.use(express.json())


// dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// middleware
//app.use(logger)


// mount routes
app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => { console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`) })

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
})