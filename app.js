import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from "method-override";
import mongoose from "mongoose";
//let {mongoose} = await import("mongoose");
import { Campground } from './models/campground.js';
import ejsMate from 'ejs-mate';


mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

const db = mongoose.connection;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));
// public is a directory name and can be replaced by any name.
// public is a directory include some folders such as /css, /js, /imgs, etc.
// public is a directory to store the static Assets.
app.use(express.static(path.join(__dirname, "/public")));

// if we are using view engine in express app,
// express is going to assume that our views(templates) exist in a directory called "views".
app.set("view engine", "ejs");
// __dirname: current directory name where this file(index.js) is located.
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate)

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
});

app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true});
    res.redirect(`/campgrounds/${campground._id}`)
});

app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`)
});

app.listen(3000, () => {
    console.log("Serving on port 3000...")
});

