const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection settings
const mongoUri = "mongodb://localhost:27017/parquet";

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  hvfhs_license_num: String,
  dispatching_base_num: String,
  originating_base_num: String,
  request_datetime: Date,
  on_scene_datetime: Date,
  pickup_datetime: Date,
  dropoff_datetime: Date,
  PULocationID: Number,
  DOLocationID: Number,
  trip_miles: Number,
  trip_time: Number,
  base_passenger_fare: Number,
  tolls: Number,
  bcf: Number,
  sales_tax: Number,
  congestion_surcharge: Number,
  airport_fee: Number,
  tips: Number,
  driver_pay: Number,
  shared_request_flag: String,
  shared_match_flag: String,
  access_a_ride_flag: String,
  wav_request_flag: String,
  wav_match_flag: Number
}, {collection:'all_parquet_data'});

const DataModel = mongoose.model('Data', dataSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes to fetch and display data

app.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find({}).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 1: Trips by a specific license number
app.get('/data/license/:license', async (req, res) => {
  try {
    const data = await DataModel.find({ hvfhs_license_num: req.params.license }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 2: Trips by a specific dispatching base number
app.get('/data/dispatch/:dispatch', async (req, res) => {
  try {
    const data = await DataModel.find({ dispatching_base_num: req.params.dispatch }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 3: Trips by a specific originating base number
app.get('/data/origin/:origin', async (req, res) => {
  try {
    const data = await DataModel.find({ originating_base_num: req.params.origin }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 4: Trips on a specific date
app.get('/data/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const data = await DataModel.find({
      request_datetime: { $gte: date, $lt: nextDate }
    }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 5: Trips between two dates
app.get('/data/daterange/:start/:end', async (req, res) => {
  try {
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);

    const data = await DataModel.find({
      request_datetime: { $gte: startDate, $lt: endDate }
    }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 6: Trips with a specific pickup location
app.get('/data/pickup/:location', async (req, res) => {
  try {
    const data = await DataModel.find({ PULocationID: req.params.location }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 7: Trips with a specific dropoff location
app.get('/data/dropoff/:location', async (req, res) => {
  try {
    const data = await DataModel.find({ DOLocationID: req.params.location }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 8: Trips with distance greater than a specified value
app.get('/data/distance/:miles', async (req, res) => {
  try {
    const data = await DataModel.find({ trip_miles: { $gte: req.params.miles } }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 9: Trips with fare greater than a specified value
app.get('/data/fare/:amount', async (req, res) => {
  try {
    const data = await DataModel.find({ base_passenger_fare: { $gte: req.params.amount } }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint 10: Trips with tips greater than a specified value
app.get('/data/tips/:amount', async (req, res) => {
  try {
    const data = await DataModel.find({ tips: { $gte: req.params.amount } }).limit(10);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
