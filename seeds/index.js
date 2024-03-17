import mongoose from "mongoose";
//let {mongoose} = await import("mongoose");
import { cities } from './cities.js';
import { places, descriptors } from './seedHelpers.js';
import { Campground } from '../models/campground.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });


const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quisquam error vero, aut molestiae neque dicta officiis suscipit. Ut facilis magnam debitis ipsum earum rem nostrum nemo amet rerum perspiciatis.",            
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})