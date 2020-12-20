const mongodb = require("mongodb");
require('dotenv').config();

async function getClient() {
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

async function getCollectionByName(collectionName) {
    const client = await getClient();
    return client.collection(collectionName);
}

export default { getCollectionByName }