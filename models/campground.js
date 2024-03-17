import mongoose from "mongoose";
//let {mongoose} = await import("mongoose");
 const Schema = mongoose.Schema;
 
 const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
 });

// To use our schema definition, 
// we need to convert our blogSchema into a Model we can work with.
// the name of model should be singular and uppercase like "Campground".
const Campground = mongoose.model("Campground", CampgroundSchema)

 export { Campground }