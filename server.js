const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const deliveryRoutes = require('./routes/deliveryRoutes')
const mongoose = require('mongoose')
const userRoutes= require('./routes/userRoutes')
const cors = require("cors")


mongoose
    .connect(
        `mongodb+srv://amitbar131:xqfxz54klJgw6qjG@cluster0.9dgaard.mongodb.net/?retryWrites=true&w=majority`,
        {}
    )
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.log("Unable to connect to MongoDB Atlas");
        console.error(err);
    });

app.use(bodyParser.json());
app.use(cors())

app.use("/deliveries", deliveryRoutes);
app.use('/users',userRoutes)
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
