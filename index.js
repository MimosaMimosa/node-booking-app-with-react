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
    } catch (err) {

    }
}


connection.on('connected', () => {
    console.log('connected to mongoDb')
})


connection.on('disconnected', () => {
    console.log('mongoDb is not connected')
})

app.use(express.json)

app.use('/api/users', userRoute)
app.use('/api/rooms', hotelRoute)
app.use('/api/hotels', roomRoute)
app.use('/api/auth', authRoute)

app.listen(port, () => {
    connectDb();
    console.log(`Server is running at port ${port}`)
})