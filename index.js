import express from "express";
import mongoose from "mongoose";
import Listing from "./models/Listing.js";
import methodOverride from "method-override";

const app = express();

//Setting up ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());//parameters and body parameters are turn into JSON objects making it easier to use
app.use(express.urlencoded({ extended: true })); //encoding the data so we can read it on server side

app.use(methodOverride("_method"));






//Connecting to mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/nomadNest";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Testing");
});






//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });//We need to specify the folder in which index.js is located
  //In this case listings/index.ejs
});

//The order of route handlers in Express.js matters because Express processes routes sequentially. When a request comes in, Express starts at the top of your routes list and goes down until it finds a matching route.
//Once it finds a matching route, it executes the corresponding handler and stops looking further down the list.

/*
Express treats :id as a variable placeholder and matches it with any route that has a similar structure. Since /listings/new also matches the pattern /listings/:id,
Express mistakenly triggers the "New Route" handler instead of the "Read/Show Route" handler for requests like /listings/new.
To fix this issue, you should reorder your routes so that more specific routes come before more general ones.
*/

//Hence we we are adding the new listing route first and the read/show route after

//New Route
app.get("/listings/new", (req, res) => {
  //res.send("test")
  res.render("listings/new.ejs")
})

//Read/Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

//Create Route
app.post("/listings", async (req, res) => {
  //One way to extract all the info from the form is shown below
  //let {title, description, image, price, location, country} = req.body;

  //Simpler version to do is 
  const newListing = new Listing(req.body.listing);
  await newListing.save()
  res.redirect("/listings");
})

//Edit Route 
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/edit.ejs", {listing});
})

//Update Route
app.put("/listings/:id", async (req, res) =>{
  const { id } = req.params;
  const updateListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`)
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let {id} = req.params
  await Listing.findByIdAndDelete(id)
  res.redirect('/listings')
})

app.listen(8080, (req, res) => {
  console.log("App is listening at port 8080");
});