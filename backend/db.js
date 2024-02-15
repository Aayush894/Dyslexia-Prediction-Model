import 'dotenv/config'
import mongoose from 'mongoose' ; 
import {DB_NAME} from './constants.js';
// console.log(DB_NAME);

const connectDB = async () => {
    try {
        const connectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
        await mongoose.connect(connectionString);

        console.log("DB Connected");

        console.log(`\nMongoDB connected. DB HOST: ${mongoose.connection.host}`);

        // Fetch data from the 'users' collection using Mongoose model
        const User = mongoose.model('User'); // Replace 'User' with your actual Mongoose model name
        const userData = await User.find({});
        // console.log(userData);

        /* try catch is reqired */
        // .toArray() returns a promise<pending>
        
    } catch (error) {
        console.error("MONGODB connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;