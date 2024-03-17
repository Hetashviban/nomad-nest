import mongoose from "mongoose";
import data from  "./data.js"
import Listing from "../models/Listing.js"

const MONGO_URL = "mongodb://127.0.0.1:27017/nomadNest"

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
 
//Creating an async function to remove all the existing data first before adding our dummy data
//As we are working with the database, it is an asynchronous process so we will use async and await
const initData = async() => {
    await Listing.deleteMany({}); // delete all listings in the database
    await Listing.insertMany(data)   // add new listings to the database
    console.log("Sample data inserted")
}

initData(); // add new listings/dummy data to our database