const mongodb = require("mongodb");
require("dotenv").config({ path: __dirname + "/./../.env" });
const db = require("./db.json");

async function getMongoDbClient() {
    const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const dbName = process.env.MONGODB_DBNAME;
  const connection_string = `mongodb+srv://${user}:${password}@reservation-app.3ueyn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const client = await mongodb.MongoClient.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return client.db(dbName);
}

async function pushRoomsInMongoDB(db) {
  const mongoDbClient = await getMongoDbClient();
  const roomsCollection = await mongoDbClient.collection("rooms");
  await roomsCollection.deleteMany({});
  console.log("deleted rooms");
  for (const room of db.rooms) {
    await roomsCollection.insertOne({
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      equipments: room.equipements,
      createdAt: new Date(room.createdAt),
      updatedAt: new Date(room.updatedAt)
    });
    console.log(room.name, "ok")
  }
  const reservationsCollection = await mongoDbClient.collection("reservations");
  await reservationsCollection.deleteMany({});
  console.log("deleted reservations");
  return ;
}

pushRoomsInMongoDB(db);
