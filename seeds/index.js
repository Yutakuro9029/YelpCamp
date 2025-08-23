const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "689b31fac5c498ec4ff526ce",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid debitis dolores et aspernatur asperiores deserunt odit error, quo quos, quidem nemo dolorem quia fugiat explicabo amet itaque minus recusandae?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgkzj64ol/image/upload/v1755274866/YelpCamp/mxt8xfjdp0qduxpmtbz6.jpg",
          filename: "YelpCamp/mxt8xfjdp0qduxpmtbz6",
        },
        {
          url: "https://res.cloudinary.com/dgkzj64ol/image/upload/v1755274867/YelpCamp/gcsjkayavquyl9d3zx2n.jpg",
          filename: "YelpCamp/gcsjkayavquyl9d3zx2n",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
