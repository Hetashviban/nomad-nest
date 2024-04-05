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
        default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",

        // 'set' is a function that manipulates the value of 'image' before it's saved to the database\
        //It checks if the value is blank - if it is then it will be set to the url that is defined below
        set: (v) =>
            //The below three lines of code is using ternary  operator
            v === "" // Check if the provided value is an empty string
                ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" // If empty, use the default URL
                : v // Otherwise, keep the provided value
    }
});

//Creating a Listing collection/model and exporting it use in different files as needed
const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;