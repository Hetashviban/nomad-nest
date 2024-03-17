import mongoose from "mongoose";

//Creating a blueprint/template for our Listing model in MongoDB for the documents to follow
const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 100000
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String, // Specifies that the 'image' field should be a string
    
        // If the image field is not defined or if it's empty then we set a default value for it.
        default: "https://unsplash.com/photos/a-boat-is-in-a-large-body-of-water-ciYOQZ7eKQ4",
    
        // 'set' is a function that manipulates the value of 'image' before it's saved to the database\
        //It checks if the value is blank - if it is then it will be set to the url that is defined below
        set: (v) => 
        //The below three lines of code is using ternary  operator
            v === "" // Check if the provided value is an empty string
            ? "https://unsplash.com/photos/a-window-with-a-view-of-a-lake-and-mountains-qHeCtaaeT3g" // If empty, use the default URL
            : v // Otherwise, keep the provided value
    }
});

//Creating a Listing collection/model and exporting it use in different files as needed
const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;