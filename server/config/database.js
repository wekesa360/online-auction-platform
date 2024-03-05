import mongoose from 'mongoose';

async function dbConnect() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        userCreateIndex: true,
    }).then(() => {
        console.log('Connected to database');
    }
    ).catch((error) => {
        console.log('Error connecting to database', error);
    });
}

export default dbConnect;