const express = require("express");
const mongodb = require("mongodb");
require('dotenv').config();

const router = express.Router();

// get
router.get("/", async (req, res) => {
  const rooms = await loadRoomsCollection();
  res.status(200).send(await rooms.find({
    capacity: {
      $gte: parseInt(req.query.capacity, 10)
    }
  }).sort({name: 1}).toArray());
});

// add
router.post("/", async (req, res) => {
  const rooms = await loadRoomsCollection();
  await rooms.insertOne({
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    equipements: req.body.equipements,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.status(201).send();
});

// delete
router.delete("/:id", async (req, res) => {
  const rooms = await loadRoomsCollection();
  await rooms.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
});

// helper
async function loadRoomsCollection() {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const dbName = process.env.MONGODB_DBNAME;
  const connection_string = `mongodb+srv://${user}:${password}@reservation-app.3ueyn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const client = await mongodb.MongoClient.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return client.db(dbName).collection("rooms");
}

module.exports = router;
