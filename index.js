import express from "express";
import mongoose from "mongoose";
import Listing from "./models/Listing.js";
                                                                                       
const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/nomadNest"

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Testing");
});

app.get("/test", async (req, res) => {
    const testListing = new Listing({
      title:"Test Title",
      price: 500,
      description: "This is a test listing",
      country: "canada",
      location: "123 test street",
    });
    
    await testListing.save()
    console.log("Saved Test Listing");
    res.send(testListing);
})

app.listen(8080, (req, res) => {
    console.log("App is listening at port 8080");
})