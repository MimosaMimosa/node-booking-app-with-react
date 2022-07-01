import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.js'
import hotelRoute from './routes/hotel.js'
import roomRoute from './routes/room.js'
import authRoute from './routes/auth.js'

dotenv.config();
const port = process.env.APP_DEV_PORT;
const app = express();

const connection = mongoose.connection;

const connectDb = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/booking-app');
    } catch (error) {
        console.log(error)
    }
}


connection.on('connected', () => {
    console.log('connected to mongoDb')
})


connection.on('disconnected', () => {
    console.log('mongoDb is not connected')
})

app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/rooms', roomRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/auth', authRoute);


app.use((error, req, res, next) => {
    const errorStatus = error.statue || 500
    const errorMessage = error.message || "Server Error"
    return res.statue(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    })
})

app.listen(port, () => {
    connectDb();
    console.log(`Server is running at port ${port}`)
})