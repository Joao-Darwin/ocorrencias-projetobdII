import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

function connectToMongo(): void {
    if(URI) {
        mongoose.connect(URI).catch(error => console.error(error));
    } else {
        console.error("Error to connect to MongoDB :(");
    }
}

export default connectToMongo;