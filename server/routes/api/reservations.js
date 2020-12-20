const express = require("express");
const mongodb = require("mongodb");
require('dotenv').config();

const router = express.Router();

// get
router.get("/", async (req, res) => {
  // console.log('    start:', JSON.parse(req.query.range).start)
  // console.log('gte start:', new Date(new Date(JSON.parse(req.query.range).start).getTime() + (0 * 60 * 1000)))
  // console.log('lte   end:', new Date(new Date(JSON.parse(req.query.range).end).getTime() + (0 * 60 * 1000)))
  const reservations = await loadReservationsCollection();
  res.status(200).send(await reservations.find({
    $or: [
      {
        start:{
          $gte: new Date(new Date(JSON.parse(req.query.range).start).getTime() + (0 * 60 * 1000)),
          $lte: new Date(new Date(JSON.parse(req.query.range).end).getTime() + (0 * 60 * 1000))
        }
      },
      {
        end: {
          $gte: new Date(new Date(JSON.parse(req.query.range).start).getTime() + (0 * 60 * 1000)),
          $lte: new Date(new Date(JSON.parse(req.query.range).end).getTime() + (0 * 60 * 1000))
        }
      }
    ]
  }).toArray());
});

// add
router.post("/", async (req, res) => {
  const reservations = await loadReservationsCollection();
  await reservations.insertOne({
    user_id: req.body.user_id,
    room_id: req.body.room_id,
    start: new Date(req.body.start),
    end: new Date(req.body.end),
    participants: req.body.selected_capacity,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.status(201).send();
});

// delete
router.delete("/:id", async (req, res) => {
  const reservations = await loadReservationsCollection();
  await reservations.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
});

// helper
async function loadReservationsCollection() {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const dbName = process.env.MONGODB_DBNAME;
  const connection_string = `mongodb+srv://${user}:${password}@reservation-app.3ueyn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const client = await mongodb.MongoClient.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  return client.db(dbName).collection("reservations");
}

module.exports = router;
